//dessa formar voce extrae somente o que quer do arquivo
const { obterPessoa } = require("./service");

async function main() {
  try {
    const { results } = await obterPessoa(`a`);

    // EM VEZ DE FAZER UM FOR(LOOP)PARA LISTAR TODOS OS ELEMENTOS DO ARRAY
    //JAVASCRIPT FACILITOU PARA GENTE
    //BASTA UTILIZAR A FUNCAO MAP
    //QUE PERCORRE E LISTA TODO O ARRAY
    const pesos = results.map(item => parseInt(item.height));
    const total = pesos.reduce((anterior, proximo) => {
      return anterior + proximo;
    });
    console.log("total:", total);
  } catch (err) {
    console.log("deu ruimmm", err);
  }
}

main();
