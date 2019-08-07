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
        return this.db.read();
      }
    };
  }
}
module.exports = HeroesRoutes;
