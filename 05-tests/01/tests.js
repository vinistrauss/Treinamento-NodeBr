//Os famosos TDD

const assert = require("assert");
const { obterPessoa } = require("./service");

describe("Star Wars Api", function() {
  it("deve buscar r2-d2 com o formato correto", async () => {
    const expected = [
      {
        nome: "R2-D2",
        peso: "96"
      }
    ];

    const nomeBase = `r2-d2`;
    const resultado = await obterPessoa(nomeBase);
    assert.deepEqual(resultado, expected);
  });
});

//Os testes sao bem demorados podemos otimiza-los utilizando o `npm install nock`
//que faz com que o método nao fique consultando toda vez na api quando chamado.
