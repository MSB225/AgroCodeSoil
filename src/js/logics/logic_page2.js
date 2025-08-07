
export let array_resultados = {}

export function id() {

    let id = Math.random()
    array_resultados["id"] = id

}

export function camposAmostra() {

    const amostraValores = JSON.parse(localStorage.getItem("AmostraValoresPage1")) || [];

    amostraValores.forEach(amostra => {

        const select = document.querySelector("#selecionar_amostra")
        const select2 = document.querySelector("#definir_processo")


        if (select.value == amostra.id && select2.value === "1") {

            array_resultados["Amostra"] = amostra.Nome
            array_resultados["Processo"] = select2.children[1].textContent


        }

    })


}

export function calagemResultado() {

    const amostraValores = JSON.parse(localStorage.getItem("AmostraValoresPage1")) || [];

    amostraValores.forEach(amostra => {

        const select = document.querySelector("#selecionar_amostra")
        const select2 = document.querySelector("#definir_processo")

        if (select.value == amostra.id && select2.value === "1") {

            const v2 = parseFloat(document.getElementById("V2").value);
            const prnt = parseFloat(document.getElementById("PRNT").value);

            const v1 = amostra.Saturação_Base;
            const ctc = amostra.CTC_pH7;

            let necessidadeCalc = ((v2 - v1) * ctc * (100 / prnt)) / 100;

            if (isNaN(necessidadeCalc) || !isFinite(necessidadeCalc) || necessidadeCalc === 0) {
                array_resultados["Necessidade"] = `--- t/ha`;
            } else {
                array_resultados["Necessidade"] = `${necessidadeCalc.toFixed(2)} t/ha`;
            }
        }

    });
}


