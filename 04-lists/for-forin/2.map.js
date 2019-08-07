const service = require("./service");
const axios = require("axios");

Array.prototype.meuMap = function(callback) {
  const novoArrayMapeado = [];
  for (let i = 0; i <= this.length - 1; i++) {
    const resultado = callback(this[i], i);
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
};

async function main() {
  try {
    const result = await service.obterPessoa("Han Solo");
    //const names = [];

    // console.time("foreach");
    // result.results.foreach(function(item) {
    //   names.push(item.name);
    // });
    // console.timeEnd("foreach");

    const name = result.results.map(pessoa => pessoa.name);
    const starShip = result.results.map(starShip => starShip.starships[0]);
    const getStarShipt = await axios.get(starShip.toString());

    // const name = result.results.meuMap(function(pessoa, i) {
    //   return `[${i}], ${pessoa.name}`;
    // });
    console.log("names:", name);
    console.log("starship:", getStarShipt.data.name);
  } catch (error) {
    console.log("deu ruim", error);
  }
}

main();

// //Funcao map
// var fahrenheit = [0, 32, 45, 50, 75, 80, 99, 120];
// // var celcius = fahrenheit.map(function(elem) {
// //   return Math.round(((elem - 32) * 5) / 9);
// // });
// var celcius = fahrenheit.map(elem => elem);
// console.log(celcius);
