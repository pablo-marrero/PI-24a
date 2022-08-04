const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    imgFlags:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    continent:{
      type: DataTypes.STRING,
      // type: DataTypes.ENUM('America', 'Europa', 'Ocearina', 'Asia', 'Africa', 'Antartida',"No hay continente"),
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING
    },
    area:{
      type: DataTypes.INTEGER
    },
    population:{
      type: DataTypes.INTEGER
    },
    location:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
  },
    {timestamps: false}
  );
};
