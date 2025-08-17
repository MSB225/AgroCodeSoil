import { jsPDF } from 'https://cdn.skypack.dev/jspdf';


export function gerarPdf(id) {

    const dados = JSON.parse(localStorage.getItem("AmostraSalvasPage3")) || [];
    console.log(id)

    dados.forEach(amostra => {

        if (amostra.id == id) {

            const doc = new jsPDF();

            // Configurações gerais do pdf 

            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);

            // Corpo do Pdf

            doc.text("Recomendação de Calagem ", 105, 20, { align: "center" });

            // Dados do Proprietário

            doc.setFontSize(14);
            doc.text("Dados do Proprietário ", 20, 40);

            const corpo_dados = [


                `Nome/Proprietário: ${amostra.Nome}`,
                `Município: ${amostra.Municipio}`,
                `Localidade: ${amostra.Localidade}`,
                `Endereço: ${amostra.Endereço}`,
                `Cep: ${amostra.Cep}`

            ]

            let y_corpo_dados = 55;
            doc.setFont("helvetica", "normal");

            corpo_dados.forEach(linha => {
                doc.text(linha, 20, y_corpo_dados);
                y_corpo_dados += 10;
            });

            // Dados Da Recomendação 

            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Recomendação das Áreas ", 20, 112);

            let y_dados_recomendacao = 130; // Mover para fora do loop

            for (let i = 0; i < amostra.Areas.length; i++) {

                const texto = `Recomenda-se para, a área de ${amostra.Areas[i].Area}/ha na camada ${amostra.Areas[i].Camada} cm, uma quantidade de calcário total de ${amostra.Areas[i].CalagemTotal}.`;

                const linhas = doc.splitTextToSize(texto, 180); // O terceiro parâmetro (10) não é necessário aqui

                doc.setFont("helvetica", "normal");

                linhas.forEach(linha => {
                    doc.text(linha, 20, y_dados_recomendacao);
                    y_dados_recomendacao += 5; // Espaçamento entre linhas
                });

                y_dados_recomendacao += 10  // Espaço entre blocos de texto (opcional)
            }


            // Converte para blob e abre em nova aba
            const pdfBlob = doc.output("blob");
            const url = URL.createObjectURL(pdfBlob);
            window.open(url, "_blank");


        }


    })


}









