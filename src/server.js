require("dotenv").config();

import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";

const app = express();
const PORT = process.env.PORT || 8081;

// config view engine
configViewEngine(app);

// init web routes
initWebRoute(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port =", PORT);
});
