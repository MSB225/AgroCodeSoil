
export let array_amostra = {}

export function amostraCadastro() {

    const resultadosSalvos = JSON.parse(localStorage.getItem("AmostraSalvasPage2")) || [];
    const select = document.querySelector("#selecionar_amostra")
    const select_camada = document.getElementById("select_camada")

    resultadosSalvos.forEach(item => {

        if (select.value == item.id) {

            array_amostra["Amostra"] = item.Amostra
            array_amostra["Processo"] = item.Processo
            array_amostra["Camada"] = select_camada.value

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







