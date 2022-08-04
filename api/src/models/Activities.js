const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activities', {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dificulty:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    },{timestamps: false}
    );
};