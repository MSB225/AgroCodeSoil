

export let array_amostra = {}
export let array_valores = {}
export let array_ctc_ph7 = []

export function id () {
    
    let id = Math.random()

    array_amostra["id"]= id 
    array_valores["id"]= id

}

export function nomeAmostra() {

    let input0 = document.getElementById("input_amostra")

    let nome_amostra = input0.value

    array_amostra["Nome"] = nome_amostra || "--"
    array_valores["Nome"] = nome_amostra || "--"
}

export function interpretarSaturacaoPorBases() {

    const input_saturacao_base = document.getElementById('input_saturacao_base');

    const saturacao_base = parseFloat(input_saturacao_base.value)

    let condicao;

    if (saturacao_base < 45) {

        condicao = "Muito Baixo";

    } else if (45 <= saturacao_base && saturacao_base <= 64) {

        condicao = "Baixo";

    } else if (65 <= saturacao_base && saturacao_base <= 80) {

        condicao = "Médio";

    } else if (saturacao_base > 80) {

        condicao = "Alto";
    }
    else {

        condicao = '--';

    }

    array_amostra["Saturação_Base"] = condicao
    array_valores["Saturação_Base"] = saturacao_base || "--"

}

export function interpretarCTCpH7() {

    const input_ctc_ph7 = document.getElementById('input_ctc_ph7');

    const ctc_ph7 = parseFloat(input_ctc_ph7.value)

    let condicao;

    if (ctc_ph7 <= 5.0) {

        condicao = 'Baixo';
        array_ctc_ph7.push("Baixo")

    } else if (5.1 <= ctc_ph7 && ctc_ph7 <= 15.0) {

        condicao = 'Médio';
        array_ctc_ph7.push("Médio")

    } else if (ctc_ph7 > 15.0) {

        condicao = 'Alto';
        array_ctc_ph7.push("Alto")

    } else {

        condicao = '--';
        array_ctc_ph7.push("--")
    }


    array_amostra["CTC_pH7"] = condicao
    array_valores["CTC_pH7"] = ctc_ph7 || "--"


}
