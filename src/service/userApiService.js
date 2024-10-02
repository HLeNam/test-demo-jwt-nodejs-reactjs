import db from "../models";

import { hashUserPassword, checkEmailExist, checkPhoneExist } from "./loginRegisterService";

const getAllUser = async () => {
    try {
        let user = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });

        if (user) {
            // let data = user.get({ plain: true });
            let data = user;

            return {
                EM: "Get data success",
                EC: 0,
                DT: data,
            };
        } else {
            return {
                EM: "Get data success",
                EC: 0,
                DT: [],
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        let { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["id", "name", "description"] },
            order: [["id", "DESC"]],
            offset,
            limit,
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        };

        return {
            EM: "Ok",
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};

const createNewUser = async (data) => {
    try {
        // check email, phone number
        let isEmailExist = await checkEmailExist(data.email);

        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1,
                DT: "email",
            };
        }

        let isPhoneExist = await checkPhoneExist(data.phone);

        if (isPhoneExist === true) {
            return {
                EM: "The phone number is already exist",
                EC: 1,
                DT: "phone",
            };
        }

        // hash user password
        let hashPassword = hashUserPassword(data.password);
        data.password = hashPassword;

        let res = await db.User.create(data);
        return {
            EM: "Create user success",
            EC: 0,
            DT: res,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with empty groupId",
                EC: 1,
                DT: "group",
            };
        }

        let user = await db.User.findOne({
            where: { id: data.id },
        });

        if (user) {
            // update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            });

            return {
                EM: "Update user succeeds",
                EC: 0,
                DT: "",
            };
        } else {
            // not found
            return {
                EM: "User not found",
                EC: 2,
                DT: "",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id },
        });

        if (user) {
            console.log("alo");
            let data = await user.destroy();
            return {
                EM: "Delete user succeed",
                EC: 0,
                DT: data,
            };
        } else {
            return {
                EM: "User not exist",
                EC: 2,
                DT: [],
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
};
