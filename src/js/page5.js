import {salvarDadosFormulario,adicionarTabela,carregarTabela,atualizarTabela,mostrarAmostraSidebar,carregarAmostraSidebar,atualizarAmostraSidebar,removerAmostraSidebar} from "./components/components_page5.js"
import {salvarCamposFormulario,array_formulario} from "./logics/logic_page5.js"

// salve forms

document.addEventListener("click",(event) => {

    if (event.target && event.target.id === "button_enviar"){
        
        salvarCamposFormulario()
        salvarDadosFormulario(array_formulario)
        adicionarTabela(array_formulario)
    
    }

});


// reload page

document.addEventListener("DOMContentLoaded", (event) => {

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


