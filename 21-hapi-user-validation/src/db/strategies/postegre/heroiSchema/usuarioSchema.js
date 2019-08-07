const sequelize = require("sequelize");

const UsuarioSchema = {
  name: "usuarios",
  schema: {
    id: {
      type: sequelize.INTEGER,
      require: true,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: sequelize.STRING,
      unique: true,
      required: false
    },
    password: {
      type: sequelize.STRING,
      required: false
    }
  },
  options: {
    tableName: "TB_usuarios",
    freezeTableName: false,
    timestamps: false
  }
};
module.exports = UsuarioSchema;
