import db from "../models";

import bcrypt from "bcryptjs";
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

export { registerNewUser };
