import express from "express";

import { getHomePage, handelUserPage } from "../controller/homeController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initWebRoute = (app) => {
    router.get("/", getHomePage);

    router.get("/user", handelUserPage);

    return app.use("/", router);
};

export default initWebRoute;
