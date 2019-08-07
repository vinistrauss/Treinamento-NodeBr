const IDb = require("./base/interfaceDb");
const mongoose = require("mongoose");
const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectando"
};

class MongoDBStrategy extends IDb {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === "Conectado") return state;
    if (state === "Conectando") return state;

    await new Promise(resolve => setTimeout(resolve, 2000));

    return STATUS[this._driver.readyState];
  }
  connect() {
    mongoose.connect(
      "mongodb://admin:adminsenha@localhost:27017/admin",
      { useNewUrlParser: true },
      function(err) {
        if (!err) return;
        console.log("falaha na conexao", err);
      }
    );
    const connection = mongoose.connection;
    this._driver = connection;
    connection.once("open", () =>
      console.log("database rodando com sucesso!!")
    );
    this.defineModel();
  }
  defineModel() {
    const heroiSchema = new mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertAt: {
        type: Date,
        default: new Date()
      }
    });

    this._herois = mongoose.model("admin", heroiSchema);
  }
  create(item) {
    return this._herois.create(item);
  }
  read(item, skip = 0, limit = 10) {
    return this._herois
      .find(item)
      .skip(skip)
      .limit(limit);
  }
  update(id, item) {
    return this._herois.updateOne({ _id: id }, { $set: item });
  }
  delete(id) {
    return this._herois.deleteOne({ _id: id });
  }
}

module.exports = MongoDBStrategy;
