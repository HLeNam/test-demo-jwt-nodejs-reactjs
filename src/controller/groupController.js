import groupService from "../service/groupService";

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroups();

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data,
        });
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: [],
        };
    }
};

module.exports = { readFunc };
