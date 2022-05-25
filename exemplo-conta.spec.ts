import { ContaBancaria } from "./exemplo-conta";

describe("Testes Conta Bancária", () => {
  describe("Quando um depósito for realizado", () => {
    test("Deve adicionar o valor ao saldo quando houver sucesso", () => {
      // configuracao
      const conta = new ContaBancaria("123456", "1", "1212323156");
      // execucao
      conta.deposita(10);
      //  verificacao
      expect(conta.getSaldo()).toBe(10);
    });

    test("Não deve adicionar o saldo quando o depósito for maior que 900", () => {
      const conta = new ContaBancaria("123456", "1", "1212323156");

      try {
        conta.deposita(901);
      } catch (error) {}

      expect(conta.getSaldo()).toBe(0);
    });

    test("Não deve adicionar o saldo quando o depósito for negativo", () => {
      const conta = new ContaBancaria("123456", "1", "1212323156");

      try {
        conta.deposita(-20);
      } catch (error) {}

      expect(conta.getSaldo()).toBe(0);
    });
  });

  describe("Quando um saque for realizado", () => {
    test("Quando um saque for realizado com sucesso", () => {
      const conta = new ContaBancaria("123456", "1", "1212323156");
      conta.deposita(10);

      conta.saca(2);

      expect(conta.getSaldo()).toBe(8);
    });
  });

  test("Quando depositar 10 e sacar 20, o saldo deve permanecer 10", () => {
    const conta = new ContaBancaria("123456", "1", "1212323156");

    try {
      conta.deposita(10);
      conta.saca(20);
    } catch (error) {}
    expect(conta.getSaldo()).toBe(10);
  });

  test("Quando o saque for negativo não poderá ser realizado", () => {
    const conta = new ContaBancaria("123456", "1", "1212323156");
    try {
      conta.deposita(0);
      conta.saca(-1);
    } catch (error) {}
    expect(conta.getSaldo()).toBe(0);
  });

  //Fazer os 3 testes do saque
  // abrir o terminal pasta no exemplo-conta
  // rodar o comando jest ./exemplo-conta.spec.ts

  test("Quando receber um pix maior que 900 reais,não será depositado", () => {
    const conta = new ContaBancaria("123456", "1", "1212323156");
    try {
      conta.recebePix(900);
    } catch (error) {}

    expect(conta.getSaldo()).toBe(900);
  });

  test("Quando criar uma conta o numero da conta não pode ser nulo", () => {
    const contaBancaria = new ContaBancaria("123456", "1", "1212323156");

    try {
      contaBancaria.getConta();
    } catch (error) {}
    expect(contaBancaria.getConta()).toBe("1");
  });

  test("Quando o cliente quiser ver o saldo,cobrar a taxa de visualizacao", () => {
    const conta = new ContaBancaria("123456", "1", "1212323156");
    conta.deposita(100);

    expect(conta.getSaldoEImprimeEmPapel()).toBe(99);
  });

  test("Quando o saldo do cliente for zero,avisar que nao sera possivel imprimir o comprovante", () => {
    const conta = new ContaBancaria("123456", "1", "1212323156");
    try {
      conta.deposita(0);
    } catch (error) {}

    expect(() => {
      conta.getSaldoEImprimeEmPapel();
    }).toThrow("seu saldo é insuficiente para imprimir");
  });

  test("Quando o pagamento do pix exceder 900 reais", () => {
    const contaBancaria = new ContaBancaria("123456", "1", "1212323156");
    try {
      contaBancaria.recebePix(900);
      contaBancaria.pagaPix(900);
    } catch (error) {}
    expect(contaBancaria.getSaldo()).toBe(900);
  });
});
