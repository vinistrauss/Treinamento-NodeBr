const IDb = require("./../base/interfaceDb");
const mongoose = require("mongoose");
const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectando"
};
const statusAtual = "";

class MongoDBStrategy extends IDb {
  constructor(connection, schema) {
    super();
    this._conection = connection;
    this._schema = schema;
  }
  async isConnected() {
    const state = STATUS[this._conection.readyState];
    if (state === "Conectado") return state;
    if (state !== "Conectando") return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this._conection.readyState];
  }
  static connectMongo() {
    mongoose.connect(
      process.env.MONGODB_URL,
      { useNewUrlParser: true },
      function(err) {
        if (!err) return;
        console.log("falha na conexao", err);
      }
    );

    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("database rodando com sucesso!!");
    });
    return connection;
  }
  async create(item) {
    console.log("item: ", item);

    return this._schema.create(item);
  }
  read(item, skip = 0, limit = 10) {
    return this._schema
      .find(item)
      .skip(skip)
      .limit(limit);
  }
  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }
  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDBStrategy;
