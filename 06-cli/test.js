const { ok, deepEqual } = require("assert");
const dataBase = require("./dataBase");

const DEFAULT_ITEM_CADASTRAR = { nome: "BATMAN", poder: "RICO", id: 2 };
const DEFAULT_ITEM_ATUALIZAR = { nome: "HULK", poder: "FORCA", id: 3 };

describe("SUITE DE MANIPIULAÇÃO DE HEROIS ", () => {
  before(async () => {
    await dataBase.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await dataBase.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });
  it("deve listar um heroi", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await dataBase.listar(expected.id);
    deepEqual(resultado, expected);
  });
  it("deve cadastrar um heroi", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await dataBase.cadastrar(expected);
    const [atual] = await dataBase.listar(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(atual, expected);
  });
  it("deve deletar um heroi", async () => {
    const expected = true;
    const resultado = await dataBase.remover(2);
    deepEqual(resultado, expected);
  });
  it.only("deve atualizar um heroi", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "Homem de Ferro",
      poder: "Dinheiro"
    };
    const novoDado = { nome: "Homem de Ferro", poder: "Dinheiro" };
    await dataBase.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await dataBase.listar(DEFAULT_ITEM_ATUALIZAR.id);
    deepEqual(resultado, expected);
  });
});
