const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/productos");
const carritoRoute = require("./routes/car_shop");
//const ventasRoute = require("./routes/tienda");



const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use("/api", userRoute)
app.use("/api", carritoRoute)


app.get("/", (req, res) => {
    res.send("Welcome to my API");
});


mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => console.log("Connected to MongoDB Atlas"))
   .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening to", port));