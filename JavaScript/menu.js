document.addEventListener('DOMContentLoaded', () => {
  // Recupera o usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));

  // Exibe nome e saldo, se houver usuário logado
  if (usuarioLogado) {
    const nomeElemento = document.getElementById('user-name');
    const valorElemento = document.getElementById('valor');

    nomeElemento.textContent = usuarioLogado.nome;
    valorElemento.textContent = `R$ ${usuarioLogado.valor_deposito}`
    valorElemento.style.visibility = 'visible';
    valorElemento.style.fontWeight = 'bold'
  } else {
    alert('Nenhum usuário logado. Redirecionando para o login...');
    window.location.href = 'login.html';
  }

  // Função para redirecionar para outra página
  window.irPara = function(pagina) {
    window.location.href = pagina;
  };

  // Função de logout
  window.voltar = function() {
    const confirmar = confirm('Deseja realmente sair do sistema?');
    if (confirmar) {
      localStorage.removeItem('usuario_logado');
      window.location.href = 'login.html';
    }
  };
});