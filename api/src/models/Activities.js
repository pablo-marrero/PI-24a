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
      dificultad:{
        type: DataTypes.STRING(5)
      },
      duracion:{
        type: DataTypes.FLOAT
      },
      temporada:{
        type: DataTypes.ENUM("Verano","Otoño","Invierno","Primavera")
      }
    },{timestamps: false}
    );
};