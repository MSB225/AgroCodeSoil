import { id, camposAmostra, calagemResultado, array_resultados } from "./logics/logic_page2.js"
import { adicionarElementos, listarAmostras, salvarDadosAmostra, limparElementos, adicionarTabela, salvarTabelaLinha, carregarTabela, atualizarTabela, mostrarAmostraSidebar, removerTabelaLinha, removerAmostraSidebar, carregarAmostraSidebar,atualizarAmostraSidebar, verificarValoresCampos } from "./components/components_page2.js";

// save and cancel process 

document.addEventListener("click", (e) => {

    if (e.target.id === "button_salvaramostra") {

        id()
        camposAmostra()
        calagemResultado()
        salvarDadosAmostra(array_resultados)
        adicionarTabela(array_resultados)
        limparElementos()

    }
    else if (e.target && e.target.id === "button_cancelaramostra") {

        limparElementos()

    }

})

// select options

document.addEventListener("change", (e) => {

    if (e.target && e.target.value === "1") {

        adicionarElementos()
        verificarValoresCampos()

    }

})

// load page

document.addEventListener("DOMContentLoaded", (e) => {


    const resetaramostra = document.getElementById("selecionar_amostra")
    const resetarprocesso = document.getElementById("definir_processo")

    resetaramostra.value = "0"
    resetarprocesso.value = "0"


    listarAmostras()
    carregarTabela()
    carregarAmostraSidebar()

})

// expanded sidebar

const botao = document.getElementById("btn-amostra")

botao.addEventListener("click", (e) => {

    const sidebar = document.querySelector(".sidebar.lateral")
    sidebar.classList.toggle("expanded")

})

// remove e select fields in sidebar

document.addEventListener("click", (e) => {

    if (e.target.id === "button_delete") {

        removerAmostraSidebar()

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

