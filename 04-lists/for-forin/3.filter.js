//dessa formar voce extrae somente o que quer do arquivo
const { obterPessoa } = require("./service");

async function main() {
  try {
    const { results } = await obterPessoa(`a`);

    const familiaLawrs = results.filter(item => {
      const result = item.name.toLowerCase().indexOf("lars") !== -1;
      return result;
    });
    const name = familiaLawrs.map(pessoas => pessoas.name);
    console.log(name);
  } catch (err) {
    console.log("deu ruimmm", err);
  }
}

main();
