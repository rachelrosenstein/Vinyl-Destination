var path = require("path");
var db = require("../models")

// Routes
// =============================================================

module.exports = function (app) {

    app.get("/", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/myCollection");
        }
        res.sendFile(path.join(__dirname, "public/signup.html"));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/myCollection");
        }
        res.sendFile(path.join(__dirname, "public/login.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/myCollection", isAuthenticated, function (req, res) {
        db.UserAlbum.findAll({
            where: {
                userID: req.user.id
            },
            include: db.Album
        }).then(function (data) {
            console.log(data);
            res.render("collection", data);
        });
    });

};
