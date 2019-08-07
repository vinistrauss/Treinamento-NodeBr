const BaseRoute = require("./base/baseRoute");

class HeroesRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  list() {
    return {
      path: "/herois",
      method: "GET",
      handler: (request, head) => {
        try {
          const { skip, limit, nome } = request.query;
          let query = {};
          if (nome) {
            query.nome = nome;
          }
          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (err) {
          console.log("deu ruim", err);
          return "erro interno no servidor";
        }
      }
    };
  }
}
module.exports = HeroesRoutes;
