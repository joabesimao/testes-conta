import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export class ContaBancaria {
  private agencia: string;
  private conta: string;
  private cpf: string;
  private saldo: number;

  constructor(agencia, conta, cpf) {
    this.agencia = agencia;
    this.conta = conta;
    this.cpf = cpf;
    this.validaConta(conta);
    this.saldo = 0;
  }

  public getAgencia() {
    return this.agencia;
  }

  public getConta() {
    return this.conta;
  }

  public getSaldo() {
    return this.saldo;
  }

  public deposita(valor: number) {
    this.validaDeposito(valor);
    this.saldo = this.saldo + valor;
  }

  private validaDeposito(valor: number) {
    if (valor > 900) {
      throw new Error("O depósito não pode ser maior que 900,00");
    }
    if (valor < 0) {
      throw new Error("Depósito não pode ser negativo");
    }
  }

  public saca(valor: number) {
    this.validaSaque(valor);
    this.saldo = this.saldo - valor;
  }

  private validaSaque(valor: number) {
    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente");
    }
    if (valor < 0) {
      throw new Error("Saque não pode ser negativo");
    }
  }

  public validaTransferencia(valor: number) {
    if (valor > 1000) {
      throw new Error("transferencia maxima diaria ultrapassada!");
    }
    if (valor < 0) {
      throw new Error("Transferencia não pode ser igual a zero! ");
    }
  }

  public recebePix(valor: number) {
    this.validaDeposito(valor);
    this.saldo = this.saldo + valor;
  }

  public pagaPix(valor: number) {
    this.validaTransferencia(valor);
    this.saldo = this.saldo - valor;
  }

  public transfere(valor: number) {
    this.validaDeposito(valor);
    this.saldo = this.saldo + valor;
  }

  public validaConta(valor: string) {
    this.conta = valor;

    if (valor === "0") {
      throw new Error("a conta nao pode ser 0 ou nula");
    }
    return valor;
  }
}
