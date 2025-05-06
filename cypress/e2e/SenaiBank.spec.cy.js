/// <reference types="cypress" />

describe('Teste Geral - Fluxo completo do BankSenai', () => {
  const usuario1 = {
    email: 'cliente1@bank.com',
    nome: 'Cliente Um',
    senha: '123456',
    valor_deposito: 0
  };

  const usuario2 = {
    email: 'cliente2@bank.com',
    nome: 'Cliente Dois',
    senha: '654321',
    valor_deposito: 0
  };

  before(() => {
    // Cria dois usuários no localStorage antes dos testes
    localStorage.setItem('usuarios', JSON.stringify([usuario1, usuario2]));
  });

  it('Cadastro, login, depósito, saque, transferência e extrato', () => {
    cy.visit('http://localhost:5500/HTML/login.html');
    cy.contains('Criar conta').click();

    cy.get('#login-user').type('cliente3@bank.com');
    cy.get('#nome').type('Cliente Três');
    cy.get('#senha').type('senha123');
    cy.get('#confirmar').type('senha123');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaCadastro');
    });

    cy.get('#btnCadastrar').click();
    cy.get('@alertaCadastro').should('have.been.calledWith', 'Cadastro criado com sucesso!');
    cy.url().should('include', 'login.html');

    cy.get('#login-user').type('cliente3@bank.com');
    cy.get('#login-password').type('senha123');
    cy.get('form').submit();

    cy.url().should('include', 'menu.html');
    cy.get('#user-name').should('contain', 'Cliente Três');

    cy.contains('Depósito').click();
    cy.get('#valorDeposito').type('100');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaDeposito');
    });

    cy.get('#confirmar_deposito').click();
    cy.get('@alertaDeposito').should('have.been.calledWith', 'Depósito de R$ 100.00 efetuado com sucesso!');
    cy.get('#voltar_menu').click();

    cy.contains('Saque').click();
    cy.get('#valorSaque').type('30');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaSaque');
    });

    cy.get('#confirmar_saque').click();
    cy.get('@alertaSaque').should('have.been.calledWith', 'Saque de R$ 30.00 efetuado com sucesso!');
    cy.get('#voltar_menu').click();

    cy.contains('Transferência').click();
    cy.get('#usuarioDestino').type('Cliente Um');
    cy.get('#valorTransferencia').type('50');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaTransferencia');
    });

    cy.contains('Confirmar Transferência').click();
    cy.get('@alertaTransferencia').should('have.been.calledWith', 'Transferência de R$ 50.00 efetuada com sucesso!');

    cy.url().should('include', 'menu.html');

    // Aumenta o tempo de espera para o carregamento do extrato
    cy.visit('http://localhost:5500/HTML/extrato.html', { timeout: 120000 });
    cy.get('#extratoList').should('exist');
  });
});
