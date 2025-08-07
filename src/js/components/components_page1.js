
//-----------------------------------------Campos---------------------------------------//

export function adicionarElementos() {

    const valor_calagem = document.getElementById("opcoes")
    const valor_adubacao = document.getElementById("opcoes")
    const valor_sem_nitrogenio = document.getElementById("opcoes")

    const campo2 = document.querySelector(".conteudo.campos.elementos")

    campo2.innerHTML = ""

    if (valor_calagem.value === "1") {

        // create div div_button

        const div = document.createElement("div")
        div.id = "div_button"

        // Create elements label

        const label_amostra = document.createElement("label")
        const label_saturacao_base = document.createElement("label")
        const label_ctc_pH7 = document.createElement("label")

        // Create elements inputs

        const input_amostra = document.createElement("input")
        const input_saturacao_base = document.createElement("input")
        const input_ctc_pH7 = document.createElement("input")


        // Create elements button and img

        const button_salvaramostra = document.createElement("button")
        const button_cancelaramostra = document.createElement("button")
        const img_salvarmostra = document.createElement("img")
        const img_cancelaramostra = document.createElement("img")

        // Create element input_amostra and label_amostra

        label_amostra.textContent = "Amostra"
        label_amostra.for = "input_amostra"

        input_amostra.id = "input_amostra"
        input_amostra.type = "text"
        input_amostra.name = "nome_amostra"
        input_amostra.placeholder = "Ex.Amostra"
        input_amostra.maxLength = "20"

        // Create element input_saturacao_base and label_saturacao_base

        label_saturacao_base.textContent = "Saturação por Base"
        label_saturacao_base.for = "input_saturacao_base"

        input_saturacao_base.id = "input_saturacao_base"
        input_saturacao_base.type = "text"
        input_saturacao_base.name = "saturação_base"
        input_saturacao_base.placeholder = "%"
        input_saturacao_base.maxLength = "3"

        // Create element input_ctc_pH7 and label_ctc_pH7

        label_ctc_pH7.textContent = "CTC pH7"
        label_ctc_pH7.for = "input_ctc_ph7"

        input_ctc_pH7.id = "input_ctc_ph7"
        input_ctc_pH7.type = "text"
        input_ctc_pH7.name = "ctc_ph7"
        input_ctc_pH7.placeholder = "cmmol/dm³"
        input_ctc_pH7.maxLength = "3"

        // Create element button_salvar

        button_salvaramostra.id = "button_salvaramostra"
        img_salvarmostra.src = "./src/assets/icons/check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

        button_salvaramostra.appendChild(img_salvarmostra)

        button_cancelaramostra.id = "button_cancelaramostra"
        img_cancelaramostra.src = "./src/assets/icons/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"


        button_cancelaramostra.appendChild(img_cancelaramostra)

        div.appendChild(button_cancelaramostra)
        div.appendChild(button_salvaramostra)


        // Add the elements with the function appenchild

        label_amostra.appendChild(input_amostra)
        label_saturacao_base.appendChild(input_saturacao_base)
        label_ctc_pH7.appendChild(input_ctc_pH7)

        // Add the element on div "campo2"

        campo2.appendChild(label_amostra)
        campo2.appendChild(label_saturacao_base)
        campo2.appendChild(label_ctc_pH7)

        campo2.appendChild(div)


    }

}

//-----------------------------------------SalvarAmostras/ExcluirCampos---------------------------------------//

export function salvarValoresAmostra(amostra) {

    // load data on localstorage
    const lista = JSON.parse(localStorage.getItem("AmostraValoresPage1")) || [];

    // add in list
    lista.push(amostra);

    // save in localstorage
    localStorage.setItem("AmostraValoresPage1", JSON.stringify(lista));

}

export function salvarDadosAmostra(amostra) {

    // load data on localstorage
    const lista = JSON.parse(localStorage.getItem("AmostraTabelaPage1")) || [];

    // add in list
    lista.push(amostra);

    // save in localstorage
    localStorage.setItem("AmostraTabelaPage1", JSON.stringify(lista));

}


export function limparElementos() {

    // remove inputs and button

    const ids = [

        "input_amostra",
        "input_saturacao_base",
        "input_ctc_ph7",
        "button_salvaramostra",
        "button_cancelaramostra"
    ]

    ids.forEach(element => {

        const limparcampos = document.getElementById(element)
        limparcampos.remove()

    });

    // clear label
    const elemento_campo1 = document.querySelector(".conteudo.campos.elementos")
    elemento_campo1.textContent = ""

    // return default in select
    const opcoes = document.getElementById("opcoes")
    opcoes.value = "0"

}

//-----------------------------------------Tabela---------------------------------------//

export function adicionarTabela(amostra) {

    let table = document.querySelector("table");
    const campo2 = document.querySelector(".conteudo.tabela")

    if (!table) {
        table = document.createElement("table");
        table.id = "tabela";
        campo2.appendChild(table);
    }

    let thead = table.querySelector("thead");

    if (!thead) {
        thead = document.createElement("thead");
        thead.id = "cabecalho";

        const tr_thead = document.createElement("tr");
        tr_thead.innerHTML = `

            <th>Nome</th>
            <th>Saturação por Base</th>
            <th>CTC pH7</th>
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

        <td>${amostra.Nome}</td>
        <td>${amostra.Saturação_Base}</td>
        <td>${amostra.CTC_pH7}</td>
        <td>
            <button class="btn btn-success" id="button_excluirlista" data-id="${amostra.id}">
                <img src="./src/assets/icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg">
            </button> 
            <button class="btn btn-success" id="button_salvarlista" data-id="${amostra.id}" >
                <img src="./src/assets/icons/save_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg">
            </button>
        </td>
        
    `;

    // add listener 
    const btnSalvar = tr.querySelector("#button_salvarlista");
    const btnExcluir = tr.querySelector("#button_excluirlista");


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
    const lista = JSON.parse(localStorage.getItem("AmostraTabelaPage1")) || [];
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

    // add line table


    // load localstorage
    const amostraTabela = JSON.parse(localStorage.getItem("AmostraTabelaPage1")) || [];
    const amostraSalvas = JSON.parse(localStorage.getItem("AmostraSalvasPage1")) || [];


    // filter and some
    const idExistente = amostraTabela.find(elemento => elemento.id == id)
    const idDiferente = amostraSalvas.some(elemento => elemento.id == id)

    if (!idDiferente) {

        amostraSalvas.push(idExistente)
        localStorage.setItem("AmostraSalvasPage1", JSON.stringify(amostraSalvas))

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

    let amostraTabela = JSON.parse(localStorage.getItem("AmostraTabelaPage1")) || [];

    amostraTabela = amostraTabela.filter(item => !(item.id == id))

    localStorage.setItem("AmostraTabelaPage1", JSON.stringify(amostraTabela))


    let valoresAmostra = JSON.parse(localStorage.getItem("AmostraValoresPage1")) || [];

    valoresAmostra = valoresAmostra.filter(item => !(item.id == id))

    localStorage.setItem("AmostraValoresPage1", JSON.stringify(valoresAmostra))

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
        li.classList.add("list-group-item", "li_amostras")


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

export function removerLinhaSidebar() {

    // remove line sidebar

    let amostraSalvas = JSON.parse(localStorage.getItem("AmostraSalvasPage1")) || [];

    const inputsSelecionados = document.querySelectorAll(".caixa_input:checked");

    inputsSelecionados.forEach(input => {

        const id = input.dataset.id

        const item = input.closest(".li_amostras");
        if (item) item.remove();

        amostraSalvas = amostraSalvas.filter(item => item.id != id)

    })

    localStorage.setItem("AmostraSalvasPage1", JSON.stringify(amostraSalvas))
}

export function carregarAmostraSidebar() {

    // load field sidebar

    const lista = JSON.parse(localStorage.getItem("AmostraSalvasPage1")) || [];

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
        li.classList.add("list-group-item", "li_amostras")

        li.innerHTML = `

            <div class="item-linha">
                <span class="texto-linha">Amostra: ${element.Nome}</span>
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






