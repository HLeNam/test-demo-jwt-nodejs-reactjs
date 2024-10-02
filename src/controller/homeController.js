import {
    createNewUser,
    deleteUser,
    getUserList,
    getUserById,
    updateUserInfo,
} from "../service/userService";

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};

const handelUserPage = async (req, res) => {
    // Cookies that have not been signed
    // console.log("Cookies: ", req.cookies);

    // res.cookie("test", "test cookie");

    const userList = await getUserList();

    return res.render("user.ejs", { userList });
};

const handleCreateNewUser = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return;
    }

    await createNewUser(email, password, username);

    return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
    const id = req.params.id;

    await deleteUser(id);

    return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
    const id = req.params.id;

    const user = await getUserById(id);

    return res.render("user-update.ejs", { user });
};

const handleUpdateUser = async (req, res) => {
    const { email, username, id } = req.body;

    await updateUserInfo(email, username, id);

    return res.redirect("/user");
};

export {
    getHomePage,
    handelUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
};
