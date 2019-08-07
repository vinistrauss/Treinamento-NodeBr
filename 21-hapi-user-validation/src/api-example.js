const Hapi = require("hapi");
const MongoDb = require("./db/strategies/mongodb/mongoDbStrategy");
const Context = require("./db/strategies/base/contextStrategy");
const HeroiSchema = require("./db/strategies/mongodb/schemas/herois");

const app = new Hapi.Server({
  port: 5000
});

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, HeroiSchema));
  app.route([
    {
      path: "/herois",
      method: "GET",
      handler: (request, head) => {
        return context.read();
      }
    }
  ]);
  await app.start();
  console.log("servidor rodando na porta", app.info.port);
}

main();
