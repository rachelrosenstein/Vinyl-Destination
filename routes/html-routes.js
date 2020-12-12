const path = require("path");
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { REPL_MODE_SLOPPY } = require("repl");

// Routes
// =============================================================

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/landing.html"));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/mycollection");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/signup", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/search", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/search.html"));
    });

    app.get("/addmanual", function (req, res) {
        // If the user isn't logged in, send them to the login page
        if (!req.user) {
            res.redirect("/login");
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
    // If a user who is not logged in tries to access this route they will be redirected to the login page
    app.get("/mycollection", isAuthenticated, function (req, res) {
        db.User.findAll({
            where: {
                id: req.user.id
            },
            include: [{
                model: db.Album,
                as: "albums",
                required: false,
                attributes: ["id", "name", "artist", "streamURL", "imageURL", "wikiSummary"],
                through: {
                    model: db.UserAlbums,
                    as: "useralbums",
                    attributes: ["albumID", "isFavorite", "updatedAt"]
                }
            }]
        }).
        then(function (data) {
            resultsArray = [];
            
            for (let i = 0; i < data[0].albums.length; i++) {
                const album = {
                    id: data[0].albums[i].id,
                    name: data[0].albums[i].name,
                    artist: data[0].albums[i].artist,
                    streamURL: data[0].albums[i].name,
                    imageURL: data[0].albums[i].imageURL,
                    wikiSummary: data[0].albums[i].wikiSummary,
                    albumID: data[0].albums[i].useralbums.albumID,
                    isFavorite: data[0].albums[i].useralbums.isFavorite, 
                    updatedAt: data[0].albums[i].useralbums.updatedAt
                }
                resultsArray.push(album);
            }
            
            resultsArray.sort((a,b) => b.updatedAt - a.updatedAt);
            resultsArray.sort((a,b) => b.isFavorite - a.isFavorite);
            
            res.render("collection", {albums:resultsArray});
        });
    });

};