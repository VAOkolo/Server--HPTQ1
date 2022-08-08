const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8000

//db
const mongoose = require('mongoose')
const { seedDB } = require('./seeds')

const app = express()

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')

app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send("HPTQ API")
})

// app.listen(process.env.PORT, () => {
//     console.log("Connected to db & listening at port " + process.env.PORT)
// })
mongoose.connect(process.env.MONG_URI)
    // .then(() => {
    //     seedDB()
    // })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Connected to db & listening at port " + PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

