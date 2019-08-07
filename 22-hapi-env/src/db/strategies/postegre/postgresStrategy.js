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

  async update(id, item, upsert = false) {
    const fn = upsert ? "upsert" : "update";
    return this._schema[fn](item, { where: { id: id } });
  }
  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }
  static async connect() {
    const connection = new sequelize(process.env.POSTEGRE_URL, {
      quoteIdentifiers: false,
      logging: false,
      operatorAliases: false,
      ssl: process.env.SSL_DB,
      dialeOptions: {
        ssl: process.env.SSL_DB
      }
    });
    return connection;
  }
}

module.exports = PostgresStrategy;
