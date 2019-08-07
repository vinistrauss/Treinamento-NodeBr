const Hapi = require("hapi");
const MongoDb = require("./db/strategies/mongodb/mongoDbStrategy");
const Context = require("./db/strategies/base/contextStrategy");
const HeroiSchema = require("./db/strategies/mongodb/schemas/herois");
const HeroesRoutes = require("./routes/heroeRoute");

const app = new Hapi.Server({
  port: 5000
});
function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, HeroiSchema));
  app.route([...mapRoutes(new HeroesRoutes(context), HeroesRoutes.methods())]);

  await app.start();
  console.log("server running at", app.info.port);

  return app;
}
module.exports = main();
