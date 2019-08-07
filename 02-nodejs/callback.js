//
/** Objetivo:
 * 0. Preciso obter um Usuario
 * 1. Preciso de obter o numero de telefone de um usuario a partir de um id
 * 2. Obter o endereço de um usuario pelo id
 */

function obterUsuario(callback) {
  // criar a função setTimeout só para simular a busca de dados vindo de fora
  setTimeout(function() {
    return callback(null, {
      id: 2019,
      nome: "Vinicius"
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: 2121212,
      ddd: 111
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "liberdade",
      numero: 240
    });
  }, 3000);
}

function resolverUsuario(erro, usuario) {
  console.log("usuario", usuario);
}

// obterUsuario(resolverUsuario);
obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error("deu ruim em usuario", error);
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("deu ruim em telefone", error);
      return;
    } else {
      console.log(telefone);
    }
  });

  obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
    if (error2) {
      console.error("deu ruim em telefone", error);
      return;
    } else {
      console.log(endereco);
    }
  });
});
// const usuario = obterUsuario();
// const telefone = obterTelefone(usuario.id);

// console.log("telefone", telefone);
