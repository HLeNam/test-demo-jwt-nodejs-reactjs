const { registerNewUser } = require("../service/loginRegisterService");

const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api",
    });
};

const handleRegister = async (req, res) => {
    try {
        let { email, phone, username, password } = req.body;

        if (!email || !phone || !password) {
            return res.status(200).json({
                EM: "Missing required parameters", // error message
                EC: "1", // error code
                DT: "", // data
            });
        }

        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: "Your password must have more than 3 letters", // error message
                EC: "1", // error code
                DT: "", // data
            });
        }

        // service: create user
        let data = await registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: "", // data
        });
    } catch (error) {
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }

    console.log(req.body);
};

module.exports = { testApi, handleRegister };
