const mongoose = require("mongoose");

const heroiSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  poder: {
    type: String,
    required: true
  },
  insertAt: {
    type: Date,
    default: new Date()
  }
});

//**MUDAR PARA VINISTRAUSS QUANDO FOR PARA PRODUÇÃO  E QUANDO NAO PARA admin*/
this._herois = mongoose.model("vinistrauss", heroiSchema);

//**MUDAR PARA HEROES QUANDO FOR PARA PRODUÇÃO */
module.exports = mongoose.model("herois", heroiSchema);
