document.addEventListener('DOMContentLoaded', () => {
  const botaoCadastrar = document.getElementById('btnCadastrar');
  localStorage.removeItem('cadastro_email');
  localStorage.removeItem('cadastro_nome');
  localStorage.removeItem('cadastro_senha');
  if (botaoCadastrar) {
    botaoCadastrar.addEventListener('click', (event) => {
      event.preventDefault();

      const email = document.getElementById('login-user')?.value.trim();
      const nome = document.getElementById('nome')?.value.trim();
      const senha = document.getElementById('senha')?.value.trim();
      const confirmar = document.getElementById('confirmar')?.value.trim();

      if (!nome || !email || !senha || !confirmar) {
        alert("Preencha todos os campos.");
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Digite um e-mail válido.");
        return;
      }

      if (senha !== confirmar) {
        alert('As senhas não coincidem.');
        return;
      }

      // Recupera lista existente ou inicia uma nova
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Verifica se o e-mail já foi cadastrado
      const jaExiste = usuarios.some(usuario => usuario.email === email);
      if (jaExiste) {
        alert('Este e-mail já está cadastrado.');
        return;
      }

      // Adiciona novo usuário à lista
      usuarios.push({
        email,
        nome,
        senha,
        valor_deposito: 0
      });

      // Salva a lista atualizada
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      alert('Cadastro criado com sucesso!');
      window.location.href = 'login.html';
    });
  } else {
    console.error('Botão de cadastro não encontrado.');
  }
});