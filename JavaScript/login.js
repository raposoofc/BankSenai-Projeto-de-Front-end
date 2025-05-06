document.addEventListener('DOMContentLoaded', () => {
  const inputemail = document.getElementById('login-user');
  const inputsenha = document.getElementById('login-password');
  const form = document.getElementById('formulario');
  const messageError = document.getElementById('messageError');

  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Remove espaços em branco
      const emailDigitado = inputemail.value.trim();
      const senhaDigitada = inputsenha.value.trim();

      // Recupera a lista de usuários
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Procura o usuário com email e senha correspondentes
      const usuarioEncontrado = usuarios.find(usuario =>
        usuario.email === emailDigitado && usuario.senha === senhaDigitada
      );

      if (usuarioEncontrado) {
        // Você pode salvar o usuário logado, se quiser usar depois
        localStorage.setItem('usuario_logado', JSON.stringify(usuarioEncontrado));
        window.location.href = 'menu.html';
      } else {
        messageError.textContent = 'E-mail ou senha incorretos';
        messageError.style.visibility = 'visible';
        messageError.style.marginTop = '10px';
        messageError.style.color = 'red';
        messageError.style.fontWeight = 'bold';
      }
    });

    form.addEventListener('input', () => {
      if (inputemail.value.trim() === '') {
        messageError.textContent = 'Digite o E-mail';
        inputemail.style.border = '1px solid red';
        messageError.style.visibility = 'visible';
        messageError.style.color = 'red';
        messageError.style.display = 'block';
      } else {
        messageError.style.visibility = 'hidden';
        inputemail.style.border = '2px solid #c49c3b';
      }
    });
  } else {
    console.error('Formulário de login não encontrado.');
  }
});