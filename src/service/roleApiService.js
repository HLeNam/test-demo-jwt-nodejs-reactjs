import { includes } from "lodash";
import db from "../models/index";

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true,
        });

        const persists = roles.filter(
            ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url2 === url1)
        );

        if (persists.length === 0) {
            return {
                EM: "Nothing to create...",
                EC: 0,
                DT: [],
            };
        }
        await db.Role.bulkCreate(persists);

        return {
            EM: `Create roles successfully: ${persists.length} roles...`,
            EC: 0,
            DT: [],
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

const getAllRoles = async () => {
    try {
        let roles = await db.Role.findAll({
            order: [["id", "DESC"]],
        });

        return {
            EM: "Get all roles successfully",
            EC: 0,
            DT: roles,
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

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: {
                id: id,
            },
        });

        if (!role) {
            return {
                EM: "Role not found",
                EC: 1,
                DT: [],
            };
        }

        await role.destroy();

        return {
            EM: "Delete role successfully",
            EC: 0,
            DT: [],
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

const getRolesByGroup = async (groupId) => {
    try {
        if (!groupId) {
            return {
                EM: "Group id is required",
                EC: 1,
                DT: [],
            };
        }

        let roles = await db.Group.findOne({
            where: {
                id: groupId,
            },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: {
                    attributes: [],
                },
            },
        });

        return {
            EM: "Get roles by group successfully",
            EC: 0,
            DT: roles,
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

const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({
            where: {
                groupId: +data.groupId,
            },
        });

        await db.Group_Role.bulkCreate(data.groupRoles);

        return {
            EM: "Assign role to group successfully",
            EC: 0,
            DT: [],
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

module.exports = { createNewRoles, getAllRoles, deleteRole, getRolesByGroup, assignRoleToGroup };
