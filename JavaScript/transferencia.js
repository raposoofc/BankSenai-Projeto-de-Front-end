document.addEventListener('DOMContentLoaded', () => {
    window.realizarTransferencia = function () {
      const destinatarioNome = document.getElementById('usuarioDestino').value.trim();
      const valorTransferido = parseFloat(document.getElementById('valorTransferencia').value);
  
      if (!destinatarioNome || isNaN(valorTransferido) || valorTransferido <= 0) {
        alert('Preencha corretamente o nome do destinatário e o valor.');
        return;
      }
  
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      let usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));
  
      if (!usuarioLogado) {
        alert('Usuário não logado. Redirecionando...');
        window.location.href = 'login.html';
        return;
      }
  
      if (valorTransferido > usuarioLogado.valor_deposito) {
        alert('Saldo insuficiente para realizar a transferência.');
        return;
      }
  
      if (destinatarioNome === usuarioLogado.nome) {
        alert('Você não pode transferir para si mesmo.');
        return;
      }
  
      const indexDestinatario = usuarios.findIndex(user => user.nome === destinatarioNome);
  
      if (indexDestinatario === -1) {
        alert('Usuário destinatário não encontrado.');
        return;
      }
  
      // Subtrai do remetente e adiciona ao destinatário
      usuarioLogado.valor_deposito -= valorTransferido;
      usuarios[indexDestinatario].valor_deposito += valorTransferido;
  
      // Atualiza os dados no localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuario_logado', JSON.stringify(usuarioLogado));
  
      // REGISTRA A TRANSFERÊNCIA NO EXTRATO
      let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
      transacoes.push({
        tipo: 'Transferência',
        valor: valorTransferido,
        data: new Date().toLocaleString(),
        nomeDestino: destinatarioNome
      });
      localStorage.setItem('transacoes', JSON.stringify(transacoes));
  
      alert(`Transferência de R$ ${valorTransferido.toFixed(2)} efetuada com sucesso!`);
      window.location.href = 'menu.html';
    };
  
    window.voltar = function () {
      window.location.href = 'menu.html';
    };
  });