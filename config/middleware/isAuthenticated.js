// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (req, res, next) {

    if (req.user) {
        return next();
    }

    return res.redirect("/login");
};
