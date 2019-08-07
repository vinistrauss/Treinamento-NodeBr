const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const failAction = (request, headers, erro) => {
  throw erro;
};
//Tratar erros que vieram do banco de dados, para não mostrar para o usuário informações importantes
const Boom = require("boom");

class HeroesRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  list() {
    return {
      path: "/herois",
      method: "GET",
      config: {
        tags: ["api"],
        description: "Deve listar herois",
        notes: "pode paginar resultados e filtrar por nome"
      },
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
          return Boom.internal();
        }
      }
    };
  }
  create() {
    return {
      path: "/herois",
      method: "POST",
      config: {
        tags: ["api"],
        description: "Deve cadastrar herois",
        notes: "Cadastra herois",
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
            _id: result._id,
            message: "heroi cadastrado com sucesso"
          };
        } catch (err) {
          console.log("deu ruim", err);
          return "erro interno no servidor";
        }
      }
    };
  }
  update() {
    return {
      path: "/herois/{id}",
      method: "PATCH",
      config: {
        tags: ["api"],
        description: "Deve atualizar herois",
        notes: "Atualiza herois",
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          },
          payload: {
            nome: Joi.string()
              .min(2)
              .max(100),
            poder: Joi.string()
              .min(2)
              .max(100)
          }
        }
      },
      handler: async request => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);
          const result = await this.db.update(id, dados);
          if (result.nModified !== 1)
            return {
              message: "Não foi possivel atualizar"
            };
          return {
            message: "heroi atualizado com sucesso"
          };
        } catch (err) {
          console.log("deu ruim", err);
          return "erro interno no servidor";
        }
      }
    };
  }
  delete() {
    return {
      path: "/herois/{id}",
      method: "DELETE",
      config: {
        tags: ["api"],
        description: "Deve deletar herois",
        notes: "Deleta herois",
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: async request => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          console.log("result: ", result);
          return {
            message: "Deletado com sucesso"
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
