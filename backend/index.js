const express =  require('express')
const bodyParser = require("body-parser");
const passport = require('passport')

const PORT = 5000

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())

require('./middleware/passport')(passport)

const routes = require('./Settings/routes.js')
routes(app)


const startApp = () => {
    try {
        app.listen(PORT, () => {
            console.log(`App server listen on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startApp()