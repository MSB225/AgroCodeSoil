export const array_formulario = {}

export function salvarCamposFormulario() {

    const id = Math.random()

    const nome = document.getElementById("nome")
    const municipio = document.getElementById("municipio")
    const localidade = document.getElementById("localidade")
    const endereco = document.getElementById("endereco")
    const cep = document.getElementById("cep")

    array_formulario["id"] = id
    array_formulario["Nome"] = nome.value
    array_formulario["Municipio"] = municipio.value
    array_formulario["Localidade"] = localidade.value
    array_formulario["Endereco"] = endereco.value
    array_formulario["Cep"] = cep.value

}











