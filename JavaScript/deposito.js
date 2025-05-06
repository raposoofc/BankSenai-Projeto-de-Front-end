document.addEventListener('DOMContentLoaded', () => {
    const input_valor = document.getElementById('valorDeposito');
    const confirmar_deposito = document.getElementById('confirmar_deposito');
    const voltar_menu = document.getElementById('voltar_menu');
  
    confirmar_deposito.addEventListener('click', () => {
      let valor = parseFloat(input_valor.value);
  
      if (isNaN(valor) || valor <= 0) {
        alert('Deposite um valor válido maior que zero.');
        return;
      }
  
      let usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
      if (!usuarioLogado) {
        alert('Usuário não logado. Redirecionando...');
        window.location.href = 'login.html';
        return;
      }
  
      // Atualiza saldo do usuário logado
      usuarioLogado.valor_deposito += valor;
  
      // Atualiza a lista de usuários
      usuarios = usuarios.map(user => {
        if (user.nome === usuarioLogado.nome) {
          return { ...user, valor_deposito: usuarioLogado.valor_deposito };
        }
        return user;
      });
  
      // Salva os dados atualizados
      localStorage.setItem('usuario_logado', JSON.stringify(usuarioLogado));
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      alert(`Depósito de R$ ${valor.toFixed(2)} efetuado com sucesso!`);
      input_valor.value = ''; // limpa o campo após o depósito
    });
  
    voltar_menu.addEventListener('click', () => {
      window.location.href = 'menu.html';
    });
  });