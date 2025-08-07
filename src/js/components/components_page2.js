
//-----------------------------------------Campos---------------------------------------//

export function adicionarElementos() {

    const definir_amostras = document.getElementById("definir_processo")
    const campos2 = document.querySelector(".conteudo.campos.elementos")
    const div = document.querySelector("#conteudo-campo-div")

    campos2.innerHTML = ""


    if (!div) {

        if (definir_amostras.value === "1") {

            const div = document.createElement("div")
            div.id = "conteudo-campo-div"

            // create div div_button

            const div_button = document.createElement("div")
            div_button.id = "div_button"


            const input_v2 = document.createElement("input")
            const input_prnt = document.createElement("input")

            const label_v2 = document.createElement("label")
            const label_prnt = document.createElement("label")


            // Create element button and img

            const button_salvaramostra = document.createElement("button")
            const button_cancelaramostra = document.createElement("button")
            const img_salvarmostra = document.createElement("img")
            const img_cancelaramostra = document.createElement("img")


            // Create element button_salvar

            button_salvaramostra.id = "button_salvaramostra"
            img_salvarmostra.src = "./src/assets/icons/check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

            button_salvaramostra.appendChild(img_salvarmostra)

            button_cancelaramostra.id = "button_cancelaramostra"
            img_cancelaramostra.src = "./src/assets/icons/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

            button_cancelaramostra.appendChild(img_cancelaramostra)

            div_button.appendChild(button_cancelaramostra)
            div_button.appendChild(button_salvaramostra)

            label_v2.textContent = "V% Desejada"
            label_v2.for = "V2"

            input_v2.type = "text"
            input_v2.name = "V2"
            input_v2.id = "V2"
            input_v2.placeholder = "%"
            input_v2.maxLength="2"

            label_prnt.textContent = "PRNT"
            label_prnt.for = "PRNT"

            input_prnt.type = "text"
            input_prnt.name = "PRNT"
            input_prnt.id = "PRNT"
            input_prnt.placeholder = "%"
            input_prnt.maxLength="3"


            div.appendChild(label_v2)
            div.appendChild(input_v2)
            div.appendChild(label_prnt)
            div.appendChild(input_prnt)


            campos2.appendChild(div)
            campos2.appendChild(div_button)



        }

    }

}

//-----------------------------------------SalvarAmostras/ExcluirCampos---------------------------------------//

export function listarAmostras() {

    const lista = JSON.parse(localStorage.getItem("AmostraSalvasPage1")) || [];
    const select = document.getElementById("selecionar_amostra")

    lista.forEach(element => {

        const option = document.createElement("option")

        option.value = element.id
        option.textContent = element.Nome

        select.appendChild(option)

    })

}

export function salvarDadosAmostra(amostra) {

    const lista = JSON.parse(localStorage.getItem("AmostraTabelaPage2")) || [];

    // add in list
    lista.push(amostra);

    // save in localstorage
    localStorage.setItem("AmostraTabelaPage2", JSON.stringify(lista));

}

export function limparElementos() {

    const resetaramostra = document.getElementById("selecionar_amostra")
    const resetarprocesso = document.getElementById("definir_processo")
    const div = document.querySelector("#conteudo-campo-div")

    // remove ids

    const id = [

        "V2",
        "PRNT",
        "button_salvaramostra",
        "button_cancelaramostra"

    ]

    id.forEach(element => {

        const campos = document.getElementById(element)
        campos.remove()

    })


    // remove label

    const label = document.getElementById("conteudo-campo-div")
    label.textContent = ""

    // reset select

    resetaramostra.value = "0"
    resetarprocesso.value = "0"

    // remove div 
    div.remove()

}

//-----------------------------------------Tabela---------------------------------------//

export function adicionarTabela(amostra) {

    // add div father

    const campo2 = document.querySelector(".conteudo.tabela")
    let table = document.querySelector("table");

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

            <th>Processo</th>
            <th>Amostra</th>
            <th>Necessidade</th>
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
                <td>${amostra.Processo}</td>
                <td>${amostra.Amostra}</td>
                <td>${amostra.Necessidade}</td>
                <td>
                    <button class="btn btn-success" id="button_excluirlista" data-id="${amostra.id}" >
                        <img src="./src/assets/icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg">
                    </button> 
                    <button class="btn btn-success" id="button_salvarlista" data-id="${amostra.id}" >
                        <img src="./src/assets/icons/save_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg">
                    </button>
                </td>
        
            `;

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

    const lista = JSON.parse(localStorage.getItem("AmostraTabelaPage2")) || [];
    lista.forEach(adicionarTabela)

}

export function atualizarTabela() {

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
    const amostraTabela = JSON.parse(localStorage.getItem("AmostraTabelaPage2")) || [];
    const amostraSalvas = JSON.parse(localStorage.getItem("AmostraSalvasPage2")) || [];

    // filter and some
    const idExistente = amostraTabela.find(item => item.id == id)
    const idDiferente = amostraSalvas.some(item => item.id == id)

    if (!idDiferente) {

        amostraSalvas.push(idExistente)
        localStorage.setItem("AmostraSalvasPage2", JSON.stringify(amostraSalvas))

        alert("Amostra Salva")
    }
    else {

        alert("Amostra está Salva")

    }


}

export function removerTabelaLinha(botao) {

    const id = botao.dataset.id

    const linha = botao.parentElement.parentElement

    linha.remove()

    let amostraTabela = JSON.parse(localStorage.getItem("AmostraTabelaPage2")) || [];

    amostraTabela = amostraTabela.filter(item => !(item.id == id))

    localStorage.setItem("AmostraTabelaPage2", JSON.stringify(amostraTabela))

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

    const linha_processo = botao.parentElement.parentElement.children[0].textContent
    const linha_amostra = botao.parentElement.parentElement.children[1].textContent

    const caixa_input = document.querySelectorAll(".caixa_input")

    const id_botao = botao.dataset.id

    let idExistente = false


    caixa_input.forEach(item => {

        if (item.dataset.id == id_botao) {

            idExistente = true

            console.log(`Essa amostra, id: ${id_botao} e nome:${linha_processo}:${linha_amostra} já está contida`)
        }

    })


    if (!idExistente) {

        const li = document.createElement("li")
        li.classList.add("list-group-item", "li_amostras")


        li.innerHTML = `
        
            <div class="item-linha">
                <span class="texto-linha">${linha_processo}: ${linha_amostra}</span>
                <input class="caixa_input" data-id="${id_botao}" type="checkbox">
            </div>

        `;

        ul.appendChild(li)

        console.log(`Essa amostra, id: ${id_botao} e nome: ${linha} não está contida`)
    }

}

export function carregarAmostraSidebar() {

    const amostraSalvas = JSON.parse(localStorage.getItem("AmostraSalvasPage2")) || [];

    amostraSalvas.forEach(element => {

        const sidebar = document.querySelector("#div_amostras")

        const ul = document.querySelector("#ul_amostras")

        if (!ul) {

            const ul = document.createElement("ul")
            ul.id = "ul_amostras"

        }

        const li = document.createElement("li")
        li.classList.add("list-group-item", "li_amostras")

        li.innerHTML = `

            <div class="item-linha">
                <span class="texto-linha">${element.Processo}: ${element.Amostra}</span>
                <input class="caixa_input" data-id="${element.id}" type="checkbox">
            </div>
        `;


        ul.appendChild(li)
        sidebar.appendChild(ul)

    });

}

export function removerLinhaSidebar() {

    let amostraSalvas = JSON.parse(localStorage.getItem("AmostraSalvasPage2")) || [];

    const inputsSelecionados = document.querySelectorAll(".caixa_input:checked");

    inputsSelecionados.forEach(input => {

        const id = input.dataset.id

        const item = input.closest(".li_amostras");
        if (item) item.remove();

        amostraSalvas = amostraSalvas.filter(item => item.id != id)

    })

    localStorage.setItem("AmostraSalvasPage2", JSON.stringify(amostraSalvas))

}

export function verificarValoresCampos() {


    document.addEventListener("input", (e) => {


        if (e.target.id === "V2") {

            e.target.value = e.target.value.replace(/[^0-9.]/g, "")


        }

        if (e.target.id === "PRNT") {


            e.target.value = e.target.value.replace(/[^0-9.]/g, "")

        }


    });

}