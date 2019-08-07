const assert = require("assert");
const api = require("./../api");
let app = {};
//console.log("api-BAtata: ", api);

describe.only("API Heroes test suite", function() {
  this.beforeAll(async () => {
    app = await api;
  });
  it("listar /heroes", async () => {
    const result = await app.inject({ method: "GET", url: "/herois" });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });
  it("listar /heroes - deve retornar somente X registros", async () => {
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
  it("listar /heroes - filtrar um item", async () => {
    const tamanhoLimite = 3;
    const name = "Hulk";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${tamanhoLimite}&nome=${name}`
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(dados[0].nome, name);
  });
});
