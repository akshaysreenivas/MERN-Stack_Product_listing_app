//env
require("dotenv").config();
// import modules
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/router");

// DataBase
const database = require("./config/db");
database.dbConnect();

// MIDDLEWARES ...
app.use(morgan("dev"));
// cors setup 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/", userRouter);

// port
const PORT = process.env.SERVER_PORT || 8000;
// starting a Port
app.listen(PORT, () => {
	console.log("Server is running on Port ", PORT);
});