import express from "express";

import { getHomePage, handelUserPage, handleCreateNewUser } from "../controller/homeController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initWebRoute = (app) => {
    router.get("/", getHomePage);

    router.get("/user", handelUserPage);

    router.post("/users/create-user", handleCreateNewUser);

    return app.use("/", router);
};

export default initWebRoute;
