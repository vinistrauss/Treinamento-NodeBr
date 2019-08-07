const assert = require("assert");
const Postgres = require("./../db/strategies/postgresStrategy");
const Context = require("./../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());
const MOK_CADASTRAR = {
  nome: "Gavião Negro",
  poder: "flecha"
};
const MOK_ATUALIZAR = {
  nome: "Homem Aranha",
  poder: "Gay"
};
describe("Postgres Strategy", function() {
  this.timeout(Infinity);
  this.beforeAll(async function() {
    db = await context.connect();
    await context.delete();
    await context.create(MOK_ATUALIZAR);
  });
  it("Postgres Connection", async function() {
    const result = await context.isConnected();
    assert.equal(result, true);
  });
  it("Postgres cadastrar", async function() {
    const result = await context.create(MOK_CADASTRAR);
    delete result.id;
    assert.deepEqual(result, MOK_CADASTRAR);
  });
  it("Postgres select", async function() {
    const [result] = await context.read({ nome: MOK_CADASTRAR.nome });
    //const string = JSON.stringify(result);
    delete result.id;
    //console.log("resultado:", JSON.stringify(string));

    assert.deepEqual(result, MOK_CADASTRAR);
  });
  it("Postgres update", async function() {
    const [itemAtualizar] = await context.read({ nome: MOK_ATUALIZAR.nome });
    const novoItem = {
      ...MOK_ATUALIZAR,
      nome: "Mulher Maravilha"
    };
    const [result] = await context.update(itemAtualizar.id, novoItem);
    assert.deepEqual(result, 1);
  });
  it("Postgres delete", async function() {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});
