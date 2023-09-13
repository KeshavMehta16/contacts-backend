const express = require("express");
const connectDb = require("./config/dbConnect");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 2558;

app.use(express.json());           //acts as body-parser
app.use("/api/contacts" , require("./routes/contactRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port , () => {
    console.log(`app started on port: ${port}`);
});