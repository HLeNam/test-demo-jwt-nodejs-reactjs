require("dotenv").config();

import express from "express";
import cookieParser from "cookie-parser";
import configViewEngine from "./config/viewEngine";
import configCors from "./config/cors";
import initWebRoute from "./routes/web";
import initApiRoute from "./routes/api";

import connection from "./config/connectDB";
import { createJWT, verifyToken } from "./middleware/JWTAction";

const app = express();
const PORT = process.env.PORT || 8081;

// Add headers before the routes are defined
configCors(app);

// test connection db
connection();
// test jwt
// createJWT();
// let decodedData = verifyToken(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWW9yaWNrIiwiYWRkcmVzcyI6InF1YW5nIG5nYWkiLCJpYXQiOjE3MjYxMjQ1MTd9.kcm1dXnNxqBBNnx70Vy9RwPHeCdzc3KfeQDNMrKcqVk"
// );
// console.log("decoded:", decodedData);

// config view engine
configViewEngine(app);

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config cookie - parser
app.use(cookieParser());

// init web routes
initWebRoute(app);

//
initApiRoute(app);

app.use((req, res) => {
    return res.send("404 not found");
});

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port =", PORT);
});
