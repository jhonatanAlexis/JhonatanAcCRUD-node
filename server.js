const express = require("express")
const colors = require("colors")
const connectDB = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const dotenv = require('dotenv').config() 
const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(express.json()) 
app.use(express.urlencoded({
    extended: false
}))

app.use("/api/libros", require("./routes/libros_routes"))

app.use(errorHandler)

app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`)
})