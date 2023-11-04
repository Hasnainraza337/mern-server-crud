const express = require("express");
const app = express()
const mongoose = require("mongoose");
const cors = require("cors")

require("dotenv").config();
app.use(express.json());
app.use(cors())

// routes
const studentsRoutes = require("./src/routes/studentRoutes");
const productsRoutes = require("./src/routes/productRoutes");
app.use(studentsRoutes);
app.use(productsRoutes);
// mongodb connection
const mongo_URL = process.env.CONNECTION_STRING;
mongoose.connect(mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successfully")
}).catch((err) => {
    console.log("No Connection")
})



const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is running at port:", port)
})
