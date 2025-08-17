import { amostraCadastro, array_amostra } from "./logics/logic_page3.js"
import { salvarDadosFormulario, adicionarElementosArea2, adicionarElementos, listarAmostras, salvarDadosAmostra, limparElementos, adicionarTabela, carregarTabela, atualizarTabela, removerTabelaLinha, mostrarAmostraSidebar, carregarAmostraSidebar, removerAmostraSidebar, atualizarAmostraSidebar, verificarValoresCampos } from "./components/components_page3.js"
import { gerarPdf } from "./pdf.js";

// salvar fields

document.addEventListener("click", (event) => {

    let cadastrados = JSON.parse(localStorage.getItem("AmostraSalvasPage5")) || [];

    if (event.target && event.target.id === "button_salvar_relatorio") {

        salvarDadosFormulario(cadastrados)

    }

    if (event.target.id === "button_cancelaramostra") {

        limparElementos()

    }

    if (event.target.id === "button_salvaramostra") {

        amostraCadastro()
        salvarDadosAmostra(array_amostra)
        adicionarTabela(array_amostra)
        limparElementos()

    }

});

// load page

document.addEventListener("DOMContentLoaded", (e) => {

    const resetaramostra = document.getElementById("selecionar_amostra")

    resetaramostra.value = "0"


    listarAmostras()
    carregarTabela()
    carregarAmostraSidebar()


})

// show form 

document.addEventListener("change", (e) => {

    // Verifica se o alvo da mudança foi uma checkbox com id="caixa_select"

    if (e.target && e.target.id === "caixa_select") {
        const conteudo_registro = document.querySelector(".conteudo.registro")
        const caixas = document.querySelectorAll("#caixa_select");

        // Converte NodeList em array e verifica se alguma está marcada
        const algumaMarcada = Array.from(caixas).some(item => item.checked);

        if (algumaMarcada) {

            adicionarElementosArea2()

        } else {
            conteudo_registro.innerHTML = "";
        }
    }
});


// get pdf 

document.addEventListener("click", (e) => {

    if (e.target && e.target.className === "abrir_pdf") {

        const id = e.target.dataset.id
        gerarPdf(id)

    }

})

// select options

document.addEventListener("change", (event) => {

    if (event.target && event.target.id === "selecionar_amostra") {

        adicionarElementos()
        verificarValoresCampos()


    }

})

// sidebar

const botao = document.getElementById("btn-amostra")

botao.addEventListener("click", (e) => {

    const sidebar = document.querySelector(".sidebar.lateral")
    sidebar.classList.toggle("expanded")

})

// button select and button delete

document.addEventListener("click", (e) => {

    if (e.target.id === "button_delete") {

        removerAmostraSidebar()

    }

    if (e.target.id === "button_select") {

        const botao = document.querySelector("#button_select");
        const inputs = document.querySelectorAll(".caixa_input_amostra");

        const todosMarcados = Array.from(inputs).every(input => input.checked);

        inputs.forEach(input => {
            input.checked = !todosMarcados;
        });

        const icone = e.target.querySelector(".icone")
        icone.src = todosMarcados ? "/src/assets/icons/check_box_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" : "/src/assets/icons/check_box_outline_blank_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

        botao.classList.toggle("botao-vermelho", !todosMarcados)

    }

})

