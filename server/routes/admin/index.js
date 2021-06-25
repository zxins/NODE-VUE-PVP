module.exports = app => {
    const express = require("express")
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true
    })

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware = require('../../middleware/resource')

    router.post("/", authMiddleware(), async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    router.put("/:id", authMiddleware(), async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    router.get("/", authMiddleware(), async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }

        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    router.get("/:id", authMiddleware(), async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    router.delete("/:id", authMiddleware(), async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(),
        async (req, res, next) => {
            // 构造通用的增删改查接口
            // 将复数小写变量名转换为首字母大写的单数类名
            const modelName = require('inflection').classify(req.params.resource)
            // 获取模型实例，并挂载到req.Model
            req.Model = require(`../../models/${modelName}`)
            next()
        },
        router,
    )

    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.use('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    }, router)

    app.post('/admin/api/login', async (req, res) => {
        const {username, password} = req.body
        const user = await AdminUser.findOne({username}).select('password') // model定义了select false
        assert(user, 422, '用户不存在')

        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '用户名或密码错误')

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, app.get('secret'))
        res.send({token})
    })

    // 错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
