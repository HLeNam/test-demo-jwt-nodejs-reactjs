import express from "express";

import { testApi, handleRegister } from "../controller/apiController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initApiRoute = (app) => {
    // rest api
    // GET - R, POST - C, PUT - U, DELETE - D
    router.get("/test-api", testApi);

    router.post("/register", handleRegister);

    return app.use("/api/v1/", router);
};

export default initApiRoute;
