document.addEventListener('DOMContentLoaded', () => {
    const input_valor = document.getElementById('valorSaque');
    const confirmar_saque = document.getElementById('confirmar_saque');
    const voltar_menu = document.getElementById('voltar_menu');
  
    confirmar_saque.addEventListener('click', () => {
      let valor = parseFloat(input_valor.value);
  
      if (isNaN(valor) || valor <= 0) {
        alert('Saque um valor válido maior que zero.');
        return;
      }
  
      let usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
      if (!usuarioLogado) {
        alert('Usuário não logado. Redirecionando...');
        window.location.href = 'login.html';
        return;
      }
  
      if (valor > usuarioLogado.valor_deposito) {
        alert('Saldo insuficiente para realizar o saque.');
        return;
      }
  
      // Subtrai o valor do saque do saldo do usuário logado
      usuarioLogado.valor_deposito -= valor;
  
      // Atualiza a lista de usuários
      usuarios = usuarios.map(user => {
        if (user.nome === usuarioLogado.nome) {
          return { ...user, valor_deposito: usuarioLogado.valor_deposito };
        }
        return user;
      });
  
      // Salva os dados atualizados no localStorage
      localStorage.setItem('usuario_logado', JSON.stringify(usuarioLogado));
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      alert(`Saque de R$ ${valor.toFixed(2)} efetuado com sucesso!`);
      input_valor.value = ''; // limpa o campo após o saque
    });
  
    voltar_menu.addEventListener('click', () => {
      window.location.href = 'menu.html';
    });
  });