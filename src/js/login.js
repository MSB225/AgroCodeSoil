const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const entrar = document.getElementById("entrar");

entrar.addEventListener("click", (e) => {
    e.preventDefault(); // evita recarregar se estiver dentro de um form

    if (usuario.value === "agrocode" && senha.value === "2025") {
        window.location.href = "page1.html";
    } else {
        alert("Usuário ou senha incorretos");
    }
});
