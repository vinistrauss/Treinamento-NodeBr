// npm install sequelize --framework para trabalhar com objetos e banco de dados
//npm install pg-hstore pg

const sequelize = require("sequelize");
const driver = new sequelize("heroes", "vinistrauss", "minhasenhasecreta", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorAliases: false
});

async function main() {
  const Herois = driver.define(
    "heroes",
    {
      id: {
        type: sequelize.INTEGER,
        require: true,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: sequelize.STRING,
        required: true
      },
      poder: {
        type: sequelize.STRING,
        required: true
      }
    },
    {
      tableName: "TB_heroes",
      freezeTableName: false,
      timestamps: false
    }
  );
  await Herois.sync();
  await Herois.create({
    nome: "Vinicius",
    poder: "inteligente"
  });

  const result = await Herois.findAll({ raw: true });
  console.log(result);
}

main();
