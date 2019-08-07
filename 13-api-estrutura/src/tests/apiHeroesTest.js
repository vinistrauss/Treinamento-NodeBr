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
});
