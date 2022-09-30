const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Raiting extends Model {
    static associate({ User }) {
      Raiting.UserSource = Raiting.belongsTo(User, {
        foreignKey: 'userSourceId',
      });

      Raiting.UserTarget = Raiting.belongsTo(User, {
        foreignKey: 'userTargetId',
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
    userSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    userTargetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    raiting: {
      type: DataTypes.INTEGER,
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

  Raiting.init(attributes, {
    sequelize,
    modelName: 'Raiting',
    tableName: 'Raitings',
  });
  return Raiting;
};
