const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://admin:adminsenha@localhost:27017/admin",
  { useNewUrlParser: true },
  function(err) {
    if (!err) return;
    console.log("falaha na conexao", err);
  }
);

const connection = mongoose.connection;
connection.once("open", () => console.log("database rodando com sucesso!!"));

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

const model = mongoose.model("admin", heroiSchema);

async function main() {
  const resultCadastrar = await model.create({
    nome: "BATMAN",
    poder: "BILIONÁRIO"
  });

  const listItens = await model.find();
  console.log("itens Cadastrados", listItens);
}

main();
