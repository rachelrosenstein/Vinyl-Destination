const path = require("path");
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { REPL_MODE_SLOPPY } = require("repl");

// Routes
// =============================================================

module.exports = function (app) {

    app.get("/", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/myCollection");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/myCollection");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/signup", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/addmanual", function (req, res) {
        // If the user isn't logged in, send them to the login page
        if (!req.user) {
            res.redirect("/login.html");
        }
        res.sendFile(path.join(__dirname, "../public/addManual.html"));
    });

    app.get("/album/:id", function (req, res) {
        // Look in the database for an album that matches the id passed in
        db.Album.findOne({ 
            where: { 
                id: req.params.id 
            } 
        }).then(function(album) {
            res.render("album", album);
        });
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/myCollection", isAuthenticated, function (req, res) {
        const allAlbums = 
        // return models.Albums
        db.User.findAll({
            where: {
                email: req.user.email
            },
            // include: db.Album
            include: [{
                model: db.Album,
                as: "albums",
                required: false,
                attributes: ["id", "name"],
                through: {
                    model: db.UserAlbums,
                    as: "useralbums",
                    attributes: ["albumID"]
                }
                // ,
                // where: {allAlbums}
            }]
        }).
        // return res.send({allAlbums});
        then(function (data) {
            res.render("collection", data);
        });
    });

};

// module.exports = function(sequelize, DataTypes) {
//     var UserAlbum = sequelize.define("UserAlbum", {
//         userID: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         albumID: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }/*,
//         // Marking albums as favorite isn't part of our MVP, but may be added later
//         isFavorite: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: false
//         }*/
//     });

//     return UserAlbum;
// };