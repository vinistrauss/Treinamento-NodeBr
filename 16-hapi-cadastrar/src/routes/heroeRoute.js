const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const failAction = (request, headers, erro) => {
  throw erro;
};

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
  create() {
    return {
      path: "/herois",
      method: "POST",
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string()
              .required()
              .min(3)
              .max(10),
            poder: Joi.string()
              .required()
              .min(2)
              .max(100)
          }
        }
      },
      handler: async request => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            message: "heroi cadastrado com sucesso"
          };
        } catch (err) {
          console.log("deu ruim", err);
          return "erro interno no servidor";
        }
      }
    };
  }
}
module.exports = HeroesRoutes;
