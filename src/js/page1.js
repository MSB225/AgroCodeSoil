import { id, nomeAmostra, interpretarSaturacaoPorBases, interpretarCTCpH7, array_amostra, array_valores } from "./logics/logic_page1.js";
import { adicionarElementos, salvarDadosAmostra, salvarValoresAmostra, limparElementos, adicionarTabela, salvarTabelaLinha, removerTabelaLinha, carregarTabela, atualizarTabela, mostrarAmostraSidebar, removerLinhaSidebar, carregarAmostraSidebar, verificarValoresCampos } from "./components/components_page1.js";

//-----------------------------------------Events---------------------------------------//

// salvar fields

document.addEventListener("click", (event) => {

    if (event.target && event.target.id === "button_salvaramostra") {

        id()
        nomeAmostra()
        interpretarSaturacaoPorBases()
        interpretarCTCpH7()
        salvarValoresAmostra(array_valores)
        salvarDadosAmostra(array_amostra)
        adicionarTabela(array_amostra)
        limparElementos()

    }
    else if (event.target && event.target.id === "button_cancelaramostra") {

        limparElementos()

    }

});

// select options

document.addEventListener("change", (event) => {

    if (event.target && event.target.id === "opcoes") {

        adicionarElementos()
        verificarValoresCampos()

    }

})

// reload page

document.addEventListener("DOMContentLoaded", (event) => {

    const opcoes = document.getElementById("opcoes")
    opcoes.value = "0"

    carregarTabela()
    carregarAmostraSidebar()


})

// sidebar

const botao = document.getElementById("btn-amostra")

botao.addEventListener("click", (e) => {

    const sidebar = document.querySelector(".sidebar.lateral")
    sidebar.classList.toggle("expanded")

})

// remove and select elements of the sidebar

document.addEventListener("click", (e) => {

    if (e.target.id === "button_delete") {

        removerLinhaSidebar()

    }

    if (e.target.id === "button_select") {

        const botao = document.querySelector("#button_select");
        const inputs = document.querySelectorAll(".caixa_input");

        const todosMarcados = Array.from(inputs).every(input => input.checked);

        inputs.forEach(input => {
            input.checked = !todosMarcados;
        });

        const icone = e.target.querySelector(".icone")
        icone.src = todosMarcados ? "/src/assets/icons/check_box_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" : "/src/assets/icons/check_box_outline_blank_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

        botao.classList.toggle("botao-vermelho", !todosMarcados)


    }

})




































