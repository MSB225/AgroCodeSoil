
export let array_amostra = {}


export function idCadastro() {

    let id = Math.random()
    array_amostra["id"] = id

}

export function usuarioCadastro() {

    const nome = document.getElementById("input_nome")
    const municipio = document.getElementById("input_municipio")
    const localidade = document.getElementById("input_localidade")
    const endereco = document.getElementById("input_endereco")
    const cep = document.getElementById("input_cep")

    array_amostra["Nome"] = nome.value
    array_amostra["Município"] = municipio.value
    array_amostra["Localidade"] = localidade.value
    array_amostra["Endereço"] = endereco.value
    array_amostra["Cep"]= cep.value

}

export function amostraCadastro() {

    const resultadosSalvos = JSON.parse(localStorage.getItem("AmostraSalvasPage2")) || [];
    const select = document.querySelector("#selecionar_amostra")

    resultadosSalvos.forEach(item => {

        if (select.value == item.id) {

            array_amostra["Amostra"] = item.Amostra
            array_amostra["Processo"] = item.Processo

            let area = parseFloat(document.getElementById("input_area").value);

            let calagemTotal = area * parseFloat(item.Necessidade)

            array_amostra["Area"] = area

            if (isNaN(calagemTotal) || !isFinite(calagemTotal) || calagemTotal === 0) {
                array_amostra["CalagemTotal"] = `--- toneladas`;
            } else {
                array_amostra["CalagemTotal"] = `${calagemTotal.toFixed(0)} toneladas`;
            }

        }

    })


}

export function camadaCadastro() {

    const select_camada = document.getElementById("select_camada")

    array_amostra["Camada"] = select_camada.value

}





