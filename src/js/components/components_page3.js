

export function adicionarElementos() {

    const conteudo_campos_elementos = document.querySelector(".conteudo.campos.elementos")


    if (conteudo_campos_elementos) {

        // add div conteudo_campos_formulario area/gleba

        if (!document.getElementById("input_area")) {
            const div_area = document.createElement("div")
            div_area.classList.add("campo")

            const input_area = document.createElement("input")
            const label_area = document.createElement("label")

            input_area.id = "input_area"
            label_area.id = "label_area"

            input_area.placeholder = "Ex.t/ha"
            label_area.textContent = "Área Total / Gleba"

            input_area.required = true
            input_area.type = "text"
            input_area.setAttribute("maxlength", "5")

            div_area.appendChild(label_area)
            div_area.appendChild(input_area)
            conteudo_campos_elementos.appendChild(div_area)
        }

        if (!document.getElementById("select_camada")) {
            const div_camada = document.createElement("div")
            div_camada.classList.add("campo")

            const camadas = ["0-20", "20-40"]

            const label_camada = document.createElement("label")
            label_camada.textContent = "Camada da Amostra"

            const select_camada = document.createElement("select")
            select_camada.id = "select_camada"

            const option_padrao = document.createElement("option")
            option_padrao.textContent = "Selecione uma camada"
            option_padrao.disabled = true
            option_padrao.selected = true
            select_camada.appendChild(option_padrao)


            for (let i = 0; i < camadas.length; i++) {
                const option = document.createElement("option")
                option.textContent = camadas[i] + " cm"
                option.value = camadas[i]
                option.id = "option_camada"
                select_camada.appendChild(option)
            }

            div_camada.appendChild(label_camada)
            div_camada.appendChild(select_camada)

            conteudo_campos_elementos.appendChild(div_camada)
        }

        if (!document.getElementById("button_cancelaramostra") && !document.getElementById("button_salvaramostra")) {
            const div_button = document.createElement("div")
            div_button.classList.add("campo_button")

            // Create element button and img

            const button_salvar = document.createElement("button")
            const button_cancelar = document.createElement("button")
            const img_salvar = document.createElement("img")
            const img_cancelar = document.createElement("img")


            // Create element button_salvar

            button_salvar.id = "button_salvaramostra"
            img_salvar.src = "./src/assets/icons/check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

            button_salvar.appendChild(img_salvar)

            button_cancelar.id = "button_cancelaramostra"
            img_cancelar.src = "./src/assets/icons/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

            button_cancelar.appendChild(img_cancelar)

            div_button.appendChild(button_cancelar)
            div_button.appendChild(button_salvar)

            conteudo_campos_elementos.appendChild(div_button)

        }

    }
}

export function adicionarElementosArea2() {

    const conteudo_registro = document.querySelector(".conteudo.registro")

    if (!document.getElementById("textArea")) {

        const textArea = document.createElement("textarea")
        textArea.id = "textArea"

        conteudo_registro.appendChild(textArea)
    }

    if (!document.getElementById("selecionar_cadastrado")){


        const select = document.createElement("select")
        const option = document.createElement("option")

        




    }


}

//-----------------------------------------SalvarAmostras/ExcluirCampos---------------------------------------//

export function listarAmostras() {

    const lista = JSON.parse(localStorage.getItem("AmostraSalvasPage2")) || [];
    const select = document.getElementById("selecionar_amostra")

    lista.forEach(element => {

        const option = document.createElement("option")

        option.value = element.id
        option.textContent = `${element.Processo}: ${element.Amostra}`

        select.appendChild(option)

    })

}

export function salvarDadosAmostra(amostra) {

    // load data on localstorage
    const dadosAmostra = JSON.parse(localStorage.getItem("AmostraTabelaPage3")) || [];

    // add in list
    dadosAmostra.push(amostra);

    // save in localstorage
    localStorage.setItem("AmostraTabelaPage3", JSON.stringify(dadosAmostra));

}

export function limparElementos() {

    const button_cancelar_amostra = document.getElementById("button_cancelaramostra")

    if (button_cancelar_amostra) {

        const ids = [

            "input_area",
            "button_cancelaramostra",
            "button_salvaramostra",
            "select_camada"


        ]

        ids.forEach(element => {

            const limparcampos = document.getElementById(element)
            limparcampos.remove()

        });

        // clear label
        const campos_label = document.querySelector(".conteudo.campos.elementos")
        campos_label.textContent = ""

        // clear select options
        const resetaramostra = document.getElementById("selecionar_amostra")
        resetaramostra.value = "0"

    }

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

            <th>Área</th>
            <th>Calagem Total</th>
            <th>Profundidade</th>
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

        <td>${amostra.Area}</td>
        <td>${amostra.CalagemTotal}</td>
        <td>${amostra.Camada}</td>
        <td>
            <div id=div_acoes_tabela>
                <div>
                    <button id="button_excluirlinha" data-id="${amostra.id}">
                        <img src="./src/assets/icons/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg">
                    </button> 
                </div>
                <div>
                    <input id="caixa_select" data-id="${amostra.id}" type="checkbox">
                </div>
            </div>
        </td>
        
    `;


    const btnExcluir = tr.querySelector("#button_excluirlinha");

    btnExcluir.addEventListener("click", function () {

        removerTabelaLinha(this)
        atualizarTabela()

    })

    tbody.appendChild(tr);
    table.appendChild(tbody)
    campo2.appendChild(table)


}

export function carregarTabela() {

    const lista = JSON.parse(localStorage.getItem("AmostraTabelaPage3")) || [];
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

export function removerTabelaLinha(botao) {

    const linha = botao.parentElement.parentElement.parentElement.parentElement

    linha.remove()

    const id = botao.dataset.id

    let amostraResultados = JSON.parse(localStorage.getItem("AmostraTabelaPage3")) || [];

    amostraResultados = amostraResultados.filter(item => !(item.id == id))

    localStorage.setItem("AmostraTabelaPage3", JSON.stringify(amostraResultados))

}

//-----------------------------------------Sidebar---------------------------------------//

export function mostrarAmostraSidebar(amostra) {

    const sidebar = document.querySelector("#div_amostras")

    let ul = document.querySelector("#ul_amostras")

    if (!ul) {

        const ul = document.createElement("ul")
        ul.id = "ul_amostras"
        sidebar.appendChild(ul)

    }

    const li = document.createElement("li")
    li.classList.add("list-group-item", "li_amostras")


    li.innerHTML = `
        
            <div class="item-linha">
                <span class="texto-linha" Rel.${amostra.Nome}</span>
                <button class="abrir_pdf" data-id=${amostra.id} ><img src="/src/assets/icons/open_in_new_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"></button>
                <input class="caixa_input_amostra" data-id=${amostra.id} type="checkbox">
            </div>

        `;

    ul.appendChild(li)


}

export function carregarAmostraSidebar() {

    const lista = JSON.parse(localStorage.getItem("AmostraSalvasPage3")) || [];

    lista.forEach(element => {

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
                <span class="texto-linha">Rel.${element.Nome}</span>
                <button class="abrir_pdf" data-id="${element.id}"><img src="/src/assets/icons/open_in_new_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"></button>
                <input class="caixa_input_amostra" data-id="${element.id}" type="checkbox">
                
            </div>
        `;

        ul.appendChild(li)
        sidebar.appendChild(ul)

    });

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

    let amostraResultados = JSON.parse(localStorage.getItem("AmostraSalvasPage3")) || [];

    const inputsSelecionados = document.querySelectorAll(".caixa_input_amostra:checked");

    inputsSelecionados.forEach(input => {

        const id = input.dataset.id

        const item = input.closest(".li_amostras");
        if (item) {

            item.remove();
            atualizarAmostraSidebar()

        }

        amostraResultados = amostraResultados.filter(item => item.id != id)


    })

    localStorage.setItem("AmostraSalvasPage3", JSON.stringify(amostraResultados))
}

export function verificarValoresCampos() {

    document.addEventListener("input", (e) => {

        if (e.target.id === "input_area") {

            e.target.value = e.target.value.replace(/[^0-9.]/g, "")
        }

        if (e.target.id === "input_cep") {

            e.target.value = e.target.value.replace(/[^0-9.]/g, "")
        }

        const ids = ["input_nome", "input_municipio", "input_localidade", "input_endereco"];

        if (ids.includes(e.target.id)) {
            e.target.value = e.target.value.replace(/[^a-zA-ÿ\s]/g, "");
        }

    });

}