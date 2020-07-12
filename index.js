const express = require('express')

const app = express()

const db = require('./config/mongoose')
const passportJWT = require('./config/passport-jwt')

const PORT = 8000

const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");

app.use(express.urlencoded({ extended: false }));

app.use('/doctors', doctorRoutes)
app.use("/patients", patientRoutes);

app.listen(PORT, err => {
    if (err)
        console.log("Error Starting Server")
    else
        console.log(`Server Listening on Port ${PORT}`)
})
