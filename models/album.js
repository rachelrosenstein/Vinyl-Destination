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
      mbid: {
        type: DataTypes.STRING,
        defaultValue: null
      }
    });

    Album.associate = function(models) {
        Album.belongsToMany(models.User, {
            through: 'UserAlbums',
            as: 'albums',
            foreignKey: 'albumID',
            otherKey: 'userID'
        });
    };

    return Album;
  };
  