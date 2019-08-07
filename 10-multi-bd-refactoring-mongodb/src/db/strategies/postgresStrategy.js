const IDb = require("./base/interfaceDb");
const sequelize = require("sequelize");

class PostgresStrategy extends IDb {
  constructor() {
    super();
    (this._driver = null), (this._herois = null);
  }
  async isConnected(item) {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("falhouu", error);
      return false;
    }
  }
  async create(item) {
    const { dataValues } = await this._herois.create(item);
    return dataValues;
  }
  async delete(id) {
    const query = id ? { id } : {};
    return this._herois.destroy({ where: query });
  }
  async read(item) {
    // const result = await this._herois.findAll({ raw: true });
    // const resultado = result.filter(item => {
    //   const resultadoCerto = item.nome.indexOf("Gavião Negro") !== -1;
    //   return resultadoCerto;
    // });
    return this._herois.findAll({ where: item, raw: true });
    //return result;
  }

  async update(id, item) {
    return this._herois.update(item, { where: { id: id } });
  }
  async defineModel() {
    this._herois = this._driver.define(
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
          required: false
        },
        poder: {
          type: sequelize.STRING,
          required: false
        }
      },
      {
        tableName: "TB_heroes",
        freezeTableName: false,
        timestamps: false
      }
    );
    await this._herois.sync();
  }
  async connect() {
    this._driver = new sequelize("heroes", "vinistrauss", "minhasenhasecreta", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false
    });
    await this.defineModel();
  }
}

module.exports = PostgresStrategy;
