const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routes = require('./routes')
const ErrorHandling = require('./middleware/ErrorHandling')

const app = express()
const port = +process.env.PORT || 5000

// Middleware
app.use(express.static('./static'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// Routes
app.use(routes)

// Error handling middleware (must be last)
app.use(ErrorHandling)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
