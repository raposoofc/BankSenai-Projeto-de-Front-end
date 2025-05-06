function recuperarSenha() {
    const usuario = document.getElementById("recuperar-usuario").value.trim();
    const email = document.getElementById("recuperar-email").value.trim();
  
    if (usuario === "" || email === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  

    alert(`Solicitação de recuperação enviada para:\nUsuário: ${usuario}\nEmail: ${email}`);
}