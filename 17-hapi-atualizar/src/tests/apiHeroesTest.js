const assert = require("assert");
const api = require("./../api");
let app = {};
let cadatrarObjeto = {
  nome: "Laura",
  poder: "raivosa"
};
const MOCK_INICIAL = {
  nome: "Gavião-Ne",
  poder: "Flechas"
};
let MOCK_ID = "";
describe("API Heroes test suite", function() {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: JSON.stringify(MOCK_INICIAL)
    });
    const dados = JSON.parse(result.payload);
    MOCK_ID = dados._id;
  });
  it("listar /herois", async () => {
    const result = await app.inject({ method: "GET", url: "/herois" });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });
  it("listar /herois - deve retornar somente X registros", async () => {
    const tamanhoLimite = 3;
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${tamanhoLimite}`
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === tamanhoLimite);
  });
  it("listar /herois - filtrar um item", async () => {
    const tamanhoLimite = 3;
    const nome = "Hulk";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${tamanhoLimite}&nome=${nome}`
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.deepEqual(dados[0].nome, nome);
  });
  it("cadastrar - POST /heroes ", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: JSON.stringify(cadatrarObjeto)
    });

    const payload = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    //console.log("_id: ", payload._id);
    assert.ok(statusCode === 200);
    assert.deepEqual(payload.message, "heroi cadastrado com sucesso");
  });

  it("Atualizar PATCH /herois/id ", async () => {
    const _id = MOCK_ID;
    const expected = { poder: "raivosa" };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "heroi atualizado com sucesso");
  });
  it("Atualizar PATCH /herois/id - não deve atualizar com o id incorreto", async () => {
    const _id = `5d2fc1a66751bd0dd416c418`;
    const expected = { poder: "Flechas" };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected)
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Não foi possivel atualizar");
  });
});
