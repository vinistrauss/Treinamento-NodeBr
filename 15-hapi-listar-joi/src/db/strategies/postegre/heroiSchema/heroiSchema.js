const sequelize = require("sequelize");

const heroiSchema = {
  name: "herois",
  schema: {
    id: {
      type: sequelize.INTEGER,
      require: true,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: sequelize.STRING,
      required: false
    },
    poder: {
      type: sequelize.STRING,
      required: false
    }
  },
  options: {
    tableName: "TB_heroes",
    freezeTableName: false,
    timestamps: false
  }
};
module.exports = heroiSchema;
