const Hapi = require("hapi");
const HapiJwt = require("hapi-auth-jwt2");
const MongoDb = require("./db/strategies/mongodb/mongoDbStrategy");
const Context = require("./db/strategies/base/contextStrategy");
const Postegre = require("./db/strategies/postegre/postgresStrategy");
const UsuarioSchema = require("./db/strategies/postegre/heroiSchema/usuarioSchema");
const HeroiSchema = require("./db/strategies/mongodb/schemas/herois");
const HeroesRoutes = require("./routes/heroeRoute");
const AuthRoutes = require("./routes/authRoute");
const HapiSwagger = require("hapi-swagger");
const Vision = require("vision");
const Inert = require("inert");
const jwt_secret = "MEU_SEGREDÃO_123";

const app = new Hapi.Server({
  port: 5000
});
function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, HeroiSchema));

  const connectionPost = await Postegre.connect();
  const model = await Postegre.defineModel(connectionPost, UsuarioSchema);
  const contextPost = new Context(new Postegre(connectionPost, model));

  const swaggerOptions = {
    info: {
      title: "Api Herois no curso #Node-Br",
      version: "v1.0"
    }
  };
  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  app.auth.strategy("jwt", "jwt", {
    key: jwt_secret,
    // options: { expiresIn: 20 }
    validate: async (dado, request) => {
      const [result] = await contextPost.read({
        username: dado.username.toLowerCase()
      });

      if (!result) {
        return {
          isValid: false
        };
      }
      return {
        isValid: true
      };
    }
  });
  app.auth.default("jwt");
  app.route([
    ...mapRoutes(new HeroesRoutes(context), HeroesRoutes.methods()),
    ...mapRoutes(new AuthRoutes(jwt_secret, contextPost), AuthRoutes.methods())
  ]);

  await app.start();
  console.log("server running at", app.info.port);

  return app;
}
module.exports = main();
