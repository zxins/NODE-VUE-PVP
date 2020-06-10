const express = require("express")
app = express()

app.use(express.json())
// 跨域模块
app.use(require('cors')())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})