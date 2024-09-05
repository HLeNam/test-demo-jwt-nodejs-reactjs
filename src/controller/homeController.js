const getHomePage = (req, res) => {
    return res.render("home.ejs");
};

const handelUserPage = (req, res) => {
    return res.render("user.ejs");
};

export { getHomePage, handelUserPage };
