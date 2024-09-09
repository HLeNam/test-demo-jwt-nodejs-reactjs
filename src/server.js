require("dotenv").config();

import express from "express";
import configViewEngine from "./config/viewEngine";
import configCors from "./config/cors";
import initWebRoute from "./routes/web";
import initApiRoute from "./routes/api";

import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8081;

// Add headers before the routes are defined
configCors(app);

// test connection db
connection();

// config view engine
configViewEngine(app);

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// init web routes
initWebRoute(app);

//
initApiRoute(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port =", PORT);
});
