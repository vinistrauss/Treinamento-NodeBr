const assert = require("assert");
const api = require("./../api");
let app = {};

describe("AUTH teste suite", function() {
  this.beforeAll(async () => {
    app = await api;
  });
  it("deve obter um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "Xuxa",
        password: "123"
      }
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
});
