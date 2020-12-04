module.exports = function(sequelize, DataTypes) {
    var UserAlbum = sequelize.define("UserAlbum", {
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        albumID: {
            type: DataTypes.STRING,
            allowNull: false
        }/*,
        // Marking albums as favorite isn't part of our MVP, but may be added later
        isFavorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }*/
    });

    return UserAlbum;
};