const assert = require("assert");
const Mongodb = require("./../db/strategies/mongodbStrategy");
const Context = require("./../db/strategies/base/contextStrategy");

let MOCK_ID = "";
const MOCK_HEORI_CADASTRAR = {
  nome: "Hulk",
  poder: "Fortao"
};
const MOCK_HEORI_DEFAULT = {
  nome: `Homem Aranha-${Date.now()}`,
  poder: "Teia"
};
const MOCK_HEORI_ATUALIZAR = {
  nome: `Patolino-${Date.now()}`,
  poder: "Velocidade"
};
const context = new Context(new Mongodb());
describe("MongoDb Strategy", function() {
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEORI_DEFAULT);
    const result = await context.create(MOCK_HEORI_ATUALIZAR);
    MOCK_ID = result._id;
  });
  it("MongoDb Connection", async function() {
    const result = await context.isConnected();
    const expected = "Conectado";
    assert.deepEqual(result, expected);
  });
  it("MongoDb cadastar", async function() {
    const { nome, poder } = await context.create(MOCK_HEORI_CADASTRAR);
    assert.deepEqual({ nome, poder }, MOCK_HEORI_CADASTRAR);
  });
  it("MongoDb select", async function() {
    const [{ nome, poder }] = await context.read({
      nome: MOCK_HEORI_DEFAULT.nome
    });
    const result = {
      nome,
      poder
    };
    assert.deepEqual(result, MOCK_HEORI_DEFAULT);
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
