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

this._herois = mongoose.model("admin", heroiSchema);

module.exports = mongoose.model("herois", heroiSchema);
