const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";

async function main(item) {
  const url = `${URL}/${item}`;
  const result = await axios.get(url);
  return result.data;
}

main(1)
  .then(function(resultado) {
    console.log(resultado);
  })
  .catch(function(error) {
    console.log(error);
  });
