import db from "../models/index";

import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

import mysql from "mysql2/promise";

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
    const [results, fields] = await connection.execute(
        `
            SELECT * FROM user
        `
    );

    let users = results || [];

    return users;
};

const deleteUser = async (id) => {
    const [results, fields] = await connection.execute(
        `
            DELETE FROM user
            WHERE id = ?
        `,
        [id]
    );

    return results;
};

const getUserById = async (id) => {
    const [results, fields] = await connection.execute(
        `
            SELECT * FROM user
            WHERE id = ?
        `,
        [id]
    );

    let user = {};

    if (results && results.length > 0) {
        user = results[0];
    }

    return user;
};

const updateUserInfo = async (email, username, id) => {
    const [results, fields] = await connection.execute(
        `
            UPDATE user
            SET email = ?, username = ?
            WHERE id = ?
        `,
        [email, username, id]
    );

    return results;
};

export { hashUserPassword, createNewUser, getUserList, deleteUser, getUserById, updateUserInfo };
