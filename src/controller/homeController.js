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

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};

const handelUserPage = (req, res) => {
    return res.render("user.ejs");
};

const handleCreateNewUser = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return;
    }

    const [results, fields] = await connection.execute(
        `
            INSERT INTO users (email, password, username)
            VALUES (?, ?, ?)
        `,
        [email, password, username]
    );

    console.log(">>> check req:", req.body);

    return res.send("handleCreateNewUser");
};

export { getHomePage, handelUserPage, handleCreateNewUser };
