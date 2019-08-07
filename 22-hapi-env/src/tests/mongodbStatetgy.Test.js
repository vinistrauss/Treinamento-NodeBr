const assert = require("assert");
const Mongodb = require("./../db/strategies/mongodb/mongoDbStrategy");
const Context = require("./../db/strategies/base/contextStrategy");
const heroiSchema = require("./../db/strategies/mongodb/schemas/herois");

let MOCK_ID = "";
const MOCK_HEROI_CADASTRAR = {
  nome: `Hulk-${Date.now()}`,
  poder: "Fortao"
};
const MOCK_HEORI_DEFAULT = {
  nome: `Homem Aranha-${Date.now()}`,
  poder: "Teia"
};
const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino-${Date.now()}`,
  poder: "Velocidade"
};
let context = {};

describe("MongoDb Strategy suite de testes", function() {
  this.beforeAll(async () => {
    const connection = Mongodb.connectMongo();
    context = new Context(new Mongodb(connection, heroiSchema));

    const result = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_ID = result._id;
  });
  it("MongoDb Connection", async function() {
    const result = await context.isConnected();
    const expected = "Conectado";

    assert.deepEqual(result, expected);
  });
  it("MongoDb cadastar", async function() {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });
  it("MongoDb select", async function() {
    const [{ nome, poder }] = await context.read({
      nome: MOCK_HEROI_CADASTRAR.nome
    });
    const result = {
      nome,
      poder
    };
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });
  it("atualizar", async function() {
    const result = await context.update(MOCK_ID, {
      nome: "Pernalonga"
    });
    assert.deepEqual(result.nModified, 1);
  });
  it("remover", async () => {
    const result = await context.delete(MOCK_ID);
    assert.deepEqual(result.n, 1);
  });
});
