const assert = require("assert");
const api = require("./../api");
const Context = require("./../db/strategies/base/contextStrategy");
const Postegre = require("./../db/strategies/postegre/postgresStrategy");
const UsuarioSchema = require("./../db/strategies/postegre/heroiSchema/usuarioSchema");
let app = {};
const USER = {
  username: "xuxa",
  password: "123"
};
const USER_DB = {
  username: USER.username.toLowerCase(),
  password: "$2b$04$4lrHUEqMW03lNdD1Clz92eYl2U4wCiZafR4DwvNuWX47w6CwoVv6u"
};

describe("AUTH teste suite", function() {
  this.beforeAll(async () => {
    app = await api;
    const connectionPost = await Postegre.connect();
    const model = await Postegre.defineModel(connectionPost, UsuarioSchema);
    const postegre = new Context(new Postegre(connectionPost, model));
    await postegre.update(null, USER_DB, true);
  });
  it("deve obter um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
  it("deve retornar não autorizado ao tentar obter um login errado", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "vinistrauss",
        password: "123"
      }
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 401);
    assert.ok(dados.error, "Unathorized");
  });
});
