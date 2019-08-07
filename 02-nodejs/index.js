//promisificar significa empacotar as coisas

const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // criar a função setTimeout só para simular a busca de dados vindo de fora
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      return resolve({
        id: 2019,
        nome: "Vinicius"
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: 2121212,
        ddd: 111
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "liberdade",
      numero: 240
    });
  }, 3000);
}
main();
async function main() {
  try {
    const usuario = await obterUsuario();
    const telefone = await obterTelefone(usuario.id);
    const endereco = await obterEnderecoAsync(usuario.id);

    console.log(`
    Nome: ${usuario.nome}
    Telefone: ${telefone.telefone}
    endereço: ${endereco.rua}`);
  } catch (error) {
    console.error("deu ruim", error);
  }
}

// const usuarioPromise = obterUsuario();

// usuarioPromise
//   .then(function(resultado) {
//     return obterTelefone(resultado.id);
//   })
//   .then(function(resultado) {
//     const endereco = obterEnderecoAsync(resultado.id);
//     return endereco;
//   })
//   .then(function(resultado) {
//     console.log(resultado);
//   })
//   .catch(function(err) {
//     console.error("deu ruimmmm", err);
//   });

//para manipular o sucesso usamos a função .then e catch para manipular erros
