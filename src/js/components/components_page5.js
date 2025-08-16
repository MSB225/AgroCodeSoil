export function adicionarFormulario() {

    const formulario = document.getElementById("formulario")

    if (formulario) {

        if (!document.getElementById("input_nome")) {

            const nomeDiv = document.createElement("div");
            nomeDiv.className = "form-field";
            nomeDiv.innerHTML = `
                <label for="nome">Nome/Propriedade:</label>
                <input type="text" id="input_nome" name="nome" placeholder="Ex.Rancho Profundo" maxlength="25" required>
            `;

            formulario.appendChild(nomeDiv);

        }
        if (!document.getElementById("input_municipio")) {


            const municipioDiv = document.createElement("div");
            municipioDiv.className = "form-field";
            municipioDiv.innerHTML = `
                <label for="municipio">Município:</label>
                <input type="text" id="input_municipio" name="municipio" placeholder="Ex.Cidade" maxlength="25"  required>
            `;

            formulario.appendChild(municipioDiv);

        }

        if (!document.getElementById("input_localidade")) {

            const localidadeDiv = document.createElement("div");
            localidadeDiv.className = "form-field";
            localidadeDiv.innerHTML = `
                <label for="localidade">Localidade:</label>
                <input type="text" id="input_localidade" name="localidade" placeholder="Ex.Região" maxlength="25"  required>
            `;

            formulario.appendChild(localidadeDiv);
        }
        if (!document.getElementById("input_endereco")) {

            const enderecoDiv = document.createElement("div");
            enderecoDiv.className = "form-field";
            enderecoDiv.innerHTML = `
                <label for="endereco">Endereço:</label>
                <input type="text" id="input_endereco" name="endereco" placeholder="Ex.Rua" maxlength="25"  required>
            `;

            formulario.appendChild(enderecoDiv);
        }

        if (!document.getElementById("input_cep")) {

            const cepDiv = document.createElement("div");
            cepDiv.className = "form-field";
            cepDiv.innerHTML = `
                <label for="cep">CEP:</label>
                <input type="text" id="input_cep" name="cep" placeholder="Ex.00000-000" maxlength="8" required>
            `;

            formulario.appendChild(cepDiv);

        }

        if (!document.getElementById("button_enviar")) {

            const submitBtn = document.createElement("div");
            submitBtn.className = "form-field-button";
            submitBtn.innerHTML = `
                <button id="button_enviar" type="submit">Cadastrar</button>
            `;

            formulario.appendChild(submitBtn);
        }

    }

}



export function salvarDadosFormulario(amostra) {

    // load data on localstorage
    const resultadosRelatorio = JSON.parse(localStorage.getItem("AmostraSalvasPage3")) || [];

    const caixa_select = document.querySelectorAll("#caixa_select")

    const todosMarcados = Array.from(caixa_select).filter(item => item.checked)

    let arrayAreas = []


    if (todosMarcados) {


        todosMarcados.forEach(item => {


            const area = item.parentElement.parentElement.parentElement.parentElement.children[0].textContent // Area
            const calagemtotal = item.parentElement.parentElement.parentElement.parentElement.children[1].textContent // calagem total
            const camada = item.parentElement.parentElement.parentElement.parentElement.children[2].textContent // profundidade

            const Areas = {

                "Area": area,
                "CalagemTotal": calagemtotal,
                "Camada": camada

            }

            arrayAreas.push(Areas)

        })

        const resultados = {

            "id": Math.random(),
            "Nome": amostra.Nome,
            "Município": amostra.Município,
            "Localidade": amostra.Localidade,
            "Endereço": amostra.Endereço,
            "Cep": amostra.Cep,
            "Areas": arrayAreas

        }

        resultadosRelatorio.push(resultados)

        localStorage.setItem("AmostraSalvasPage3", JSON.stringify(resultadosRelatorio))

    }

}