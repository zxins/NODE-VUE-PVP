const express = require("express")
const app = express()

app.set('secret', 'i2o3foasdjfsdf')

app.use(express.json())
// 跨域模块
app.use(require('cors')())

app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
