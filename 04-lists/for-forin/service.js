const axios = require("axios");
const URL = `https://swapi.co/api/people`;

async function obterPessoa(nome) {
  const url = `${URL}/?search=${nome}&fomart=json`;
  const response = await axios.get(url);
  return response.data;
}

obterPessoa("luke")
  .then(function(resultado) {
    //console.log("resultado", resultado);
  })
  .catch(function(err) {
    //console.err("deu ruim", err);
  });

module.exports = {
  obterPessoa
};
