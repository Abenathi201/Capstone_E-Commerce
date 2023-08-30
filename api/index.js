const {express, routes} = require('./controllers')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const app = express()
const port = +process.env.PORT || 5000

app.use(
    express.static('./static'),
    express.urlencoded({
        extended: false
    }),
    cookieParser(),
    cors(),
    routes
)
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
} )