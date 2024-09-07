import db from "../models/index";

import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

import mysql from "mysql2/promise";
import { where } from "sequelize/lib/sequelize";

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "jwtnodejsbasic",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    // console.log(">>> check hash password:", hashUserPassworđ);

    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPassword,
        });
    } catch (error) {
        console.error(">>> check error:", error);
    }
};

const getUserList = async () => {
    // Test
    let t = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true,
    });

    let role = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true,
    });

    console.log(">>> check t:", t);
    console.log(">>> check role:", role);

    let users = [];

    users = await db.User.findAll();

    return users;

    // const [results, fields] = await connection.execute(
    //     `
    //         SELECT * FROM user
    //     `
    // );

    // let users = results || [];

    // return users;
};

const deleteUser = async (id) => {
    await db.User.destroy({
        where: {
            id: id,
        },
    });

    // const [results, fields] = await connection.execute(
    //     `
    //         DELETE FROM user
    //         WHERE id = ?
    //     `,
    //     [id]
    // );

    // return results;
};

const getUserById = async (id) => {
    let user = {};

    user = await db.User.findOne({
        where: {
            id: id,
        },
    });

    return user;
    // const [results, fields] = await connection.execute(
    //     `
    //         SELECT * FROM user
    //         WHERE id = ?
    //     `,
    //     [id]
    // );

    // let user = {};

    // if (results && results.length > 0) {
    //     user = results[0];
    // }

    // return user;
};

const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        {
            email,
            username,
        },
        {
            where: {
                id,
            },
        }
    );

    // const [results, fields] = await connection.execute(
    //     `
    //         UPDATE user
    //         SET email = ?, username = ?
    //         WHERE id = ?
    //     `,
    //     [email, username, id]
    // );

    // return results;
};

export { hashUserPassword, createNewUser, getUserList, deleteUser, getUserById, updateUserInfo };
