import express from "express";

import { testApi, handleRegister, handleLogin } from "../controller/apiController";
import userController from "../controller/userController";

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

    router.post("/login", handleLogin);

    router.get("/user/read", userController.readFunc);
    router.post("user/create", userController.createFunc);
    router.put("user/update", userController.updateFunc);
    router.delete("user/delete", userController.deleteFunc);

    return app.use("/api/v1/", router);
};

export default initApiRoute;
