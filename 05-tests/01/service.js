const { get } = require("axios");

const URL = "https://swapi.co/api/people";

async function obterPessoa(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const result = await get(url);
  //return result.data.results.map(pessoa => pessoa.name);
  return result.data.results.map(mapearPessoas);
}

function mapearPessoas(item) {
  return {
    nome: item.name,
    peso: item.height
  };
}

obterPessoa("r2-d2")
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = {
  obterPessoa
};
