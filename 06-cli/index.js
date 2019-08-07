const command = require("commander");
const database = require("./dataBase");
const Heroi = require("./herois");

async function main() {
  command
    .version("v1")
    .option("-n, --nome [value]", "Nome do heroi")
    .option("-p, --poder [value]", "Poder do heroi")
    .option("-i, --id [value]", "Id do heroi")
    .option("-c, --cadastrar", "Cadastra um heroi")
    .option("-l, --listar", "Lista um heroi")
    .option("-r, --remover", "remove o heroi pelo id")
    .option("-a, --atualizar [value]", "atualiza o heroi")
    .parse(process.argv);
  const heroi = new Heroi(command);
  try {
    if (command.cadastrar) {
      delete heroi.id;
      const result = await database.cadastrar(heroi);
    }
    if (command.listar) {
      //console.log(heroi);
      const result = await database.listar();
      console.log(result);
      return;
    }
    if (command.remover) {
      //console.log(heroi);
      const result = await database.remover(heroi.id);
    }
    if (command.atualizar) {
      //console.log(heroi);
      const idParaAtualizar = parseInt(command.atualizar);
      delete heroi.id;
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const result = await database.atualizar(idParaAtualizar, heroiAtualizar);
    }
  } catch (error) {
    console.log("deu ruimm", error);
  }
}

main();
