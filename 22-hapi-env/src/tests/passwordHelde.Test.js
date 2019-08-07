const assert = require("assert");
const PasswordHelper = require("./../helpers/passwordHelpers");

const SENHA = "123";
const hash = "$2b$04$4lrHUEqMW03lNdD1Clz92eYl2U4wCiZafR4DwvNuWX47w6CwoVv6u";

describe("UserHelper test suite", () => {
  it("deve gerar uma hash partir de uma senha", async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    console.log("result: ", result);
    assert.ok(result.length > 10);
  });
  it("deve validar uma hash partir de uma senha", async () => {
    const result = await PasswordHelper.comparePassword(SENHA, hash);
    assert.ok(result);
  });
});
