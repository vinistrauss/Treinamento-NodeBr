const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");
const failAction = (request, headers, erro) => {
  throw erro;
};
const PasswordHelpers = require("../helpers/passwordHelpers");
const USER = {
  username: "xuxa",
  password: "123"
};
const Jwt = require("jsonwebtoken");

class AuthRoutes extends BaseRoute {
  constructor(key, db) {
    super();
    this.secret = key;
    this.db = db;
  }

  login() {
    return {
      path: "/login",
      method: "POST",
      config: {
        auth: false,
        tags: ["api"],
        description: "fazer login",
        notes: "retorna o token",
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        }
      },
      handler: async (request, headers) => {
        const { username, password } = request.payload;

        const [usuario] = await this.db.read({
          username: username.toLowerCase()
        });
        if (!usuario) {
          return Boom.unauthorized("o usuario informado nao existe");
        }

        const math = await PasswordHelpers.comparePassword(
          password,
          usuario.password
        );

        if (!math) {
          return Boom.unauthorized("O usuario ou senha invalidos");
        }
        // if (
        //   username.toLowerCase() !== USER.username ||
        //   password !== USER.password
        // )
        //   return Boom.unauthorized();

        const token = Jwt.sign({ username: username, id: 1 }, this.secret);
        return { token };
      }
    };
  }
}
module.exports = AuthRoutes;
