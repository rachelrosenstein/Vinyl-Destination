const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
    // CREATE A NEW ACCOUNT 
    // If the account is created, log them in
    // Otherwise, send  an error
    app.post("/api/signup", function(req, res) {
        db.User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
        })
        .then(function() {
            res.redirect(307, "/api/login");
        })
        .catch(function(err) {
            res.status(401).json(err);
        });
    });

    // LOGIN  
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);  
    });  

    // LOGOUT
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Create an album & add it to the user's collection
    app.post("/api/album", function(req, res) {
        if (!req.user) {
            // No user is logged in, send back an empty object
            res.json({});
        } else {
            // Look in the database for an album that already matches the mbid from the last.fm API request
            db.Album.findOne({ 
                where: { 
                    name: req.body.name,
                    artist: req.body.artist,
                    mbid: req.body.mbid 
                } 
            }).then(function(thisAlbum) {
                // If the album doesn't exist in the db,
                // create an album using the data sent & add it to the user's collection
                if (!thisAlbum) {
                    db.Album.create(req.body).then(function(newAlbum) {
                        db.UserAlbum.create({
                            userID: req.user.id,
                            albumID: newAlbum.id/*,
                            isFavorite: false*/
                        }).then(function() {
                            res.json(newAlbum);
                        });
                    });
                } else {
                // If thisAlbum already exists in the db, just add it to the user's collection
                    db.UserAlbum.create({
                        userID: req.user.id,
                        albumID: thisAlbum.id/*,
                        isFavorite: false*/
                    }).then(function() {
                        res.json(thisAlbum);
                    });
                }
            });
        }
    });

    // Get info for a specific album to be displayed on the front end
    app.get("/api/album", function(req, res) {
        db.Album.findOne({
            where: {
                id: req.body.id
            }
        }).then(function(album) {
            res.json(album);
        })
    });

    // DELETE  albums from a user's collection
    // If the album doesn't have an mbid (meaning the user created it manually), delete from albums and useralbums
    // If the album has an mbid, we leave the album but delete the association with this user
    app.delete("/api/album/:id", function(req, res) {
        if (!req.user) {
            // No user is logged in, send back an empty object
            res.json({});
        } else {
            db.Album.findOne({
                where: {
                    id: req.params.id
                }
            }).then(function(album) {
                // If mbid is null, delete this from albums and useralbums
                if (!album.mbid) {
                    // Delete it from albums
                    db.Album.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then(function(data) {
                        // Then delete the corresponding record from useralbums
                        db.UserAlbum.destroy({
                            where: {
                                albumID: req.params.id,
                                userID: req.user.id
                            }
                        })
                        .then(function(data) {
                            res.json(data);
                        });
                    })
                } else {
                    // If mbid isn't null, leave albums alone but delete from useralbums
                    db.UserAlbum.destroy({
                        where: {
                            albumID: req.params.id,
                            userID: req.user.id
                        }
                    })
                    .then(function(data) {
                        res.json(data);
                    });                    
                }
            })
        }
    });

    /*
    // Update an album's relationship to this user
    // (this will be used to favorite and un-favorite albums)
    app.put("/api/album", function(req, res) {
        if (!req.user) {
            // No user is logged in, send back an empty object
            res.json({});
        } else {
            db.UserAlbum.update(
                req.body,
                {
                    where: {
                        albumID: req.body.id,
                        userID: req.user.id
                    }
                })
            .then(function(data) {
                res.json(data);
            });
        }        
    });
    */

    // Get the user's collection to be displayed on the front end
    app.get("/api/collection", function(req, res) {
        if (!req.user) {
            // No user is logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's collection
            db.UserAlbum.findAll({
                where: {
                    userID: req.user.id
                },
                include: db.Album
            }).then(function(collection) {
                res.json(collection);
            })
        }
    });

    /*
    // Get the user's favorites to be displayed on the front end
    app.get("/api/favorites", function(req, res) {
        if (!req.user) {
        // No user is logged in, send back an empty object
        res.json({});
        } else {
        // Otherwise send back the user's favorites
        db.UserAlbum.findAll({
            where: {
                userID: req.user.id,
                isFavorite: true
            },
            include: db.Album
        }).then(function(favorites) {
            res.json(favorites);
        })
        }
    });
    */
};