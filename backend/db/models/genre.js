const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate({ UserGenre, BandGenre }) {
      Genre.UserGenre = Genre.belongsTo(UserGenre, {
        foreignKey: 'genreId',
      });

      Genre.BandGenre = Genre.belongsTo(BandGenre, {
        foreignKey: 'genreId',
      });
    }
  }
  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };

  Genre.init(attributes, {
    sequelize,
    modelName: 'Genre',
    tableName: 'Genres',
  });
  return Genre;
};
