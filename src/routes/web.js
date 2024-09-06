import express from "express";

import {
    getHomePage,
    handelUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
} from "../controller/homeController";

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

    return app.use("/", router);
};

export default initWebRoute;
