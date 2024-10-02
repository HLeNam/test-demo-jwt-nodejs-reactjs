require("dotenv").config();

import db from "../models";

import { Op } from "sequelize";

import bcrypt from "bcryptjs";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    // console.log(">>> check hash password:", hashUserPassworđ);

    return hashPassword;
};

const checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: {
            email,
        },
    });

    if (user) {
        return true;
    }

    return false;
};

const checkPhoneExist = async (phone) => {
    let user = await db.User.findOne({
        where: {
            phone,
        },
    });

    if (user) {
        return true;
    }

    return false;
};

const registerNewUser = async (rawUserData) => {
    try {
        // check email / phone number are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);

        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1,
            };
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone);

        if (isPhoneExist === true) {
            return {
                EM: "The phone number is already exist",
                EC: 1,
            };
        }

        // hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4,
        });

        return {
            EM: "A user is created successfully!",
            EC: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong is service...",
            EC: -2,
        };
    }
};

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};

const handleLoginUser = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: rawData.valueLogin,
                    },
                    {
                        phone: rawData.valueLogin,
                    },
                ],
            },
            raw: true,
        });

        if (user) {
            // console.log(">>> Found user with email/phone");
            let isCorrectPassword = checkPassword(rawData.password, user.password);

            if (isCorrectPassword === true) {
                // test roles
                let groupWithRoles = await getGroupWithRoles(user);

                let payload = {
                    email: user.email,
                    groupWithRoles,
                    username: user.username,
                };

                let token = createJWT(payload);

                return {
                    EM: "Ok",
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username,
                    },
                };
            }
        }

        // console.log(
        //     ">>> Not found user with email/phone:",
        //     rawData.valueLogin,
        //     " password:",
        //     rawData.password
        // );
        return {
            EM: "Your email or phone number or password is incorrect!",
            EC: 1,
            DT: "",
        };

        // if (isEmailExist === false) {
        //     return {
        //         EM: "The email is already exist",
        //         EC: 1,
        //         DT: "",
        //     };
        // }

        // if (isPhoneExist === false) {
        //     return {
        //         EM: "The phone number is already exist",
        //         EC: 1,
        //         DT: "",
        //     };
        // }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong is service...",
            EC: -2,
        };
    }
};

export { registerNewUser, handleLoginUser, hashUserPassword, checkEmailExist, checkPhoneExist };
