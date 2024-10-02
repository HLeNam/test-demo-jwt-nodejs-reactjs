import express from "express";

import { testApi, handleRegister, handleLogin, handleLogout } from "../controller/apiController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";

import userController from "../controller/userController";
import groupController from "../controller/groupController";
import roleController from "../controller/roleController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const testMiddleware = (req, res, next) => {
    console.log(">>> calling a middleware");
    next();
};

// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ["/register", "/login"];
//     if (nonSecurePaths.includes(req.path)) {
//         return next();
//     }

//     // authenticate user
//     next();
// };

const initApiRoute = (app) => {
    // rest api
    // GET - R, POST - C, PUT - U, DELETE - D
    // router.get("/test-api", testApi);

    router.all("*", checkUserJWT, checkUserPermission);

    router.post("/register", handleRegister);
    router.post("/login", testMiddleware, handleLogin);
    router.post("/logout", testMiddleware, handleLogout);
    router.get("/account", userController.getUserAccount);

    // user routes
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    // roles routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRolesByGroup);
    router.post("/role/assign-to-group", roleController.assignRoleToGroup);

    // group routes
    router.get("/group/read", groupController.readFunc);

    return app.use("/api/v1/", router);
};

export default initApiRoute;
