const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class dataBase {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }
  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }
  async listar(id) {
    const dados = await this.obterDadosArquivo();
    const dadosFiltrados = dados.filter(itens => (id ? itens.id === id : true));
    return dadosFiltrados;
  }
  async cadastrar(herois) {
    const dados = await this.obterDadosArquivo();
    const id = herois.id <= 2 ? herois.id : Date.now();
    const heroiComId = {
      id,
      ...herois
    };
    const dadosFinal = [...dados, heroiComId];
    const result = await this.escreverArquivo(dadosFinal);
    return result;
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
    return true;
  }
  async remover(id) {
    if (!id) {
      await this.escreverArquivo([]);
      return true;
    }
    const dados = await this.obterDadosArquivo();
    const result = dados.filter(item => {
      return item.id === parseInt(id);
    });
    if (result.length === 0) {
      throw Error("Usuario informado nao existe");
    }
    dados.splice(result, 1);
    return await this.escreverArquivo(dados);
  }

  async atualizar(id, modificacoes) {
    const dados = await this.obterDadosArquivo();
    // const result = dados.filter(item => {
    //   return item.id === parseInt(id);
    // });

    const result = dados.findIndex(item => item.id === parseInt(id));

    if (result === -1) {
      throw Error("Usuario informado nao existe");
    }
    const atual = dados[result];
    const objetoAtualizar = {
      ...atual,
      ...modificacoes
    };
    dados.splice(result, 1);
    return await this.escreverArquivo([...dados, objetoAtualizar]);
  }
}

module.exports = new dataBase();
