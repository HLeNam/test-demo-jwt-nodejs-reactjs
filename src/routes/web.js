import express from "express";

import {
    getHomePage,
    handelUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
} from "../controller/homeController";

import { testApi } from "../controller/apiController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initWebRoute = (app) => {
    router.get("/", getHomePage);

    router.get("/user", handelUserPage);

    router.post("/users/create-user", handleCreateNewUser);

    router.post("/delete-user/:id", handleDeleteUser);

    router.post("/update-user/:id", getUpdateUserPage);

    router.post("/users/update-user", handleUpdateUser);

    // rest api
    // GET - R, POST - C, PUT - U, DELETE - D
    router.get("/api/test-api", testApi);

    return app.use("/", router);
};

export default initWebRoute;
