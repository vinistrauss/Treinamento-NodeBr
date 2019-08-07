const IDb = require("./../base/interfaceDb");
const sequelize = require("sequelize");

class PostgresStrategy extends IDb {
  constructor(connection, schema) {
    super();
    (this._connection = connection), (this._schema = schema);
  }
  async isConnected(item) {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.log("falhouu", error);
      return false;
    }
  }
  async create(item) {
    const { dataValues } = await this._schema.create(item);
    return dataValues;
  }
  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }
  async read(item) {
    // const result = await this._schema.findAll({ raw: true });
    // const resultado = result.filter(item => {
    //   const resultadoCerto = item.nome.indexOf("Gavião Negro") !== -1;
    //   return resultadoCerto;
    // });
    return this._schema.findAll({ where: item, raw: true });
    //return result;
  }

  async update(id, item) {
    return this._schema.update(item, { where: { id: id } });
  }
  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }
  static async connect() {
    const connection = new sequelize(
      "heroes",
      "vinistrauss",
      "minhasenhasecreta",
      {
        host: "localhost",
        dialect: "postgres",
        quoteIdentifiers: false,
        operatorAliases: false
      }
    );
    return connection;
  }
}

module.exports = PostgresStrategy;
