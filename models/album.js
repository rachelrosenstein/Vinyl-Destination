module.exports = function(sequelize, DataTypes) {
    var Album = sequelize.define("Album", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 140]
        }
      },
      streamURL: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      imageURL: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      wikiSummary: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      // This id from the last.fm API results will help us make sure we don't create duplicate entries when a new user searches for an album that already exists in our db
      // We will also check for the presence of this mbid when the user wants to delete an album. If the record has this id, we'll keep it in the system but remove the association between it and the user (codified on the UserAlbum table). If there is no mbid, the user created it manually, and no other user will have an association to it, therefore it can safely be deleted from both the Album and UserAlbum tables.
      mbid: {
        type: DataTypes.STRING,
        defaultValue: null
      }
    });

    Album.associate = function(models) {
        Album.belongsToMany(models.User, {
          through: 'UserAlbum',
          as: 'users',
          foreignKey: 'albumID',
          otherKey: 'userID'
        });
    };

    return Album;
  };
  