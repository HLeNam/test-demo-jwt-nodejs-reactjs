import userApiService from "../service/userApiService";
import roleApiService from "../service/roleApiService";

const readFunc = async (req, res) => {
    // TO DO PAGINATION
    //
    try {
        // console.log(">>> check req.user:", req.user);
        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const createFunc = async (req, res) => {
    try {
        // TODO VALIDATE

        let data = await roleApiService.createNewRoles(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

// TO DO: update role
const updateFunc = async (req, res) => {
    try {
        // TODO VALIDATE

        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const getRolesByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;

        let data = await roleApiService.getRolesByGroup(id);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data);

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getRolesByGroup,
    assignRoleToGroup,
};
