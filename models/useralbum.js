module.exports = function(sequelize, DataTypes) {
    var UserAlbum = sequelize.define("UserAlbum", {
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        albumID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return UserAlbum;
};