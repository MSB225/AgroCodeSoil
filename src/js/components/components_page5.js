
export function salvarDadosFormulario(formulario) {


    // load data on localstorage
    const lista = JSON.parse(localStorage.getItem("AmostraTabelaPage5")) || [];

    // add in list
    lista.push(formulario);

    // save in localstorage
    localStorage.setItem("AmostraTabelaPage5", JSON.stringify(lista));

}

//-----------------------------------------Tabela---------------------------------------//

export function adicionarTabela(formulario) {

    let table = document.querySelector("table");
    const campo2 = document.querySelector(".conteudo.tabela")

    if (!table) {
        table = document.createElement("table");
        table.id = "tabela";

    }

    let thead = table.querySelector("thead");

    if (!thead) {
        thead = document.createElement("thead");
        thead.id = "cabecalho";

        const tr_thead = document.createElement("tr");
        tr_thead.innerHTML = `

            <th>Nome</th>
            <th>Município</th>
            <th>Localidade</th>
            <th>Endereço</th>
            <th>Cep</th>
            <th>Ações</th>
           
            
        `;

        thead.appendChild(tr_thead);
        table.appendChild(thead);
    }

    let tbody = table.querySelector("tbody");

    if (!tbody) {

        tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    const tr = document.createElement("tr")
    tr.innerHTML = `

        <td>${formulario.Nome}</td>
        <td>${formulario.Municipio}</td>
        <td>${formulario.Localidade}</td>
        <td>${formulario.Endereco}</td>
        <td>${formulario.Cep}</td>
        <td>
            <button id="button_excluirlinha" data-id="${formulario.id}">
                <img src="./src/assets/icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg">
            </button> 
            <button id="button_salvarlinha" data-id="${formulario.id}" >
                <img src="./src/assets/icons/save_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg">
            </button>
        </td>
        
    `;

    // add listener 
    const btnSalvar = tr.querySelector("#button_salvarlinha");
    const btnExcluir = tr.querySelector("#button_excluirlinha");


    btnSalvar.addEventListener("click", function (e) {

        const id = e.target.dataset.id
        salvarTabelaLinha(id)
        mostrarAmostraSidebar(this)

    })

    btnExcluir.addEventListener("click", function () {

        removerTabelaLinha(this)
        atualizarTabela()

    })

    tbody.appendChild(tr);
    table.appendChild(tbody)
    campo2.appendChild(table)

}

export function carregarTabela() {

    // load table
    const lista = JSON.parse(localStorage.getItem("AmostraTabelaPage5")) || [];
    lista.forEach(adicionarTabela)

}

export function atualizarTabela() {

    //load table tag th 
    const table = document.querySelector("table")
    const tbody = table.querySelector("tbody")

    if (tbody.rows.length === 0) {

        table.classList.add("sem-linha");
        location.reload()

    }
    else {

        table.classList.remove("sem-linha")

    }

}

export function salvarTabelaLinha(id) {

    // load localstorage
    const amostraTabela = JSON.parse(localStorage.getItem("AmostraTabelaPage5")) || [];
    const amostraSalvas = JSON.parse(localStorage.getItem("AmostraSalvasPage5")) || [];


    // filter and some
    const idExistente = amostraTabela.find(elemento => elemento.id == id)
    const idDiferente = amostraSalvas.some(elemento => elemento.id == id)

    if (!idDiferente) {

        amostraSalvas.push(idExistente)
        localStorage.setItem("AmostraSalvasPage5", JSON.stringify(amostraSalvas))

        alert("Amostra Salva")
    }
    else {

        alert("Amostra está Salva")

    }


}

export function removerTabelaLinha(botao) {

    // remove line table

    const linha = botao.parentElement.parentElement

    linha.remove()

    const id = botao.dataset.id

    let amostraTabela = JSON.parse(localStorage.getItem("AmostraTabelaPage5")) || [];

    amostraTabela = amostraTabela.filter(item => !(item.id == id))

    localStorage.setItem("AmostraTabelaPage5", JSON.stringify(amostraTabela))

}

//-----------------------------------------Sidebar---------------------------------------//

export function mostrarAmostraSidebar(botao) {

    const sidebar = document.querySelector("#div_amostras")

    // create elements - ul

    let ul = document.querySelector("#ul_amostras")

    if (!ul) {

        const ul = document.createElement("ul")
        ul.id = "ul_amostras"
        sidebar.appendChild(ul)


    }

    // add li e append sidebar

    const linha = botao.parentElement.parentElement.children[0].textContent

    const caixa_input = document.querySelectorAll(".caixa_input")

    const id_botao = botao.dataset.id

    let idExistente = false


    caixa_input.forEach(item => {

        if (item.dataset.id == id_botao) {

            idExistente = true

            console.log(`Essa amostra, id: ${id_botao} e nome: ${linha} já está contida`)
        }

    })


    if (!idExistente) {

        const li = document.createElement("li")
        li.classList.add("li_amostras")


        li.innerHTML = `
        
            <div class="item-linha">
                <span class="texto-linha">Amostra: ${linha}</span>
                <input class="caixa_input" data-id="${id_botao}" type="checkbox">
            </div>

        `;

        ul.appendChild(li)

        console.log(`Essa amostra, id: ${id_botao} e nome: ${linha} não está contida`)
    }

}

export function atualizarAmostraSidebar() {

    const li_amostras = document.querySelectorAll(".li_amostras")
    const icone = document.querySelector(".icone")
    const botao = document.querySelector("#button_select");

    if (li_amostras.length === 0) {

        icone.src = "/src/assets/icons/check_box_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
        botao.classList.toggle("botao-verde", icone)
        location.reload()
    }

}

export function removerAmostraSidebar() {

    // remove line sidebar

    let amostraSalvas = JSON.parse(localStorage.getItem("AmostraSalvasPage5")) || [];

    const inputsSelecionados = document.querySelectorAll(".caixa_input:checked");

    inputsSelecionados.forEach(input => {

        const id = input.dataset.id

        const item = input.closest(".li_amostras");
        if (item) {

            item.remove();
            atualizarAmostraSidebar()

        }

        amostraSalvas = amostraSalvas.filter(item => item.id != id)

    })

    localStorage.setItem("AmostraSalvasPage5", JSON.stringify(amostraSalvas))
}

export function carregarAmostraSidebar() {

    // load field sidebar

    const lista = JSON.parse(localStorage.getItem("AmostraSalvasPage5")) || [];

    lista.forEach(element => {

        const sidebar = document.querySelector("#div_amostras")

        // create elements - ul

        const ul = document.querySelector("#ul_amostras")

        if (!ul) {

            const ul = document.createElement("ul")
            ul.id = "ul_amostras"

        }

        // add li e append sidebar

        const li = document.createElement("li")
        li.classList.add("li_amostras")

        li.innerHTML = `

            <div class="item-linha">
                <span class="texto-linha">Usuário: ${element.Nome}</span>
                <input class="caixa_input" data-id="${element.id}" type="checkbox">
            </div>
        `;


        ul.appendChild(li)
        sidebar.appendChild(ul)

    });

}

export function verificarValoresCampos() {


    document.addEventListener("input", (e) => {

        if (e.target.id === "input_amostra") {

            e.target.value = e.target.value.replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]/g, "")

        }

        if (e.target.id === "input_saturacao_base") {

            e.target.value = e.target.value.replace(/[^0-9.]/g, "")


        }

        if (e.target.id === "input_ctc_ph7") {


            e.target.value = e.target.value.replace(/[^0-9.]/g, "")

        }


    });

}
