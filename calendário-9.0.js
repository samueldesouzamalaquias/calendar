let diasDaSemana = []
const mesesDoAno = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

let arrayObjDias = [];
let mesFiltrado = [];

//classes
class Calendário{
    constructor(ano,primeiraFolga){
        this.ano = ano
        this.meses = {}
        
        for(let i=0;i<12;i++){
            
          const tamanho = new Date(ano,i+1,0).getDate();
          const primeiroDiaDaSemana = new Date(ano,i,1).getDay();
          const dias = Array.from({length:tamanho},(_,index)=>index+1);
          mesFiltrado = filtrarDias(dias,primeiraFolga)
          //criar objetos de dia baseados na array "dias"
          arrayObjDias = [];
          for(let i=1;i<=tamanho;i++){
            let objDia
              if(mesFiltrado.includes(i)){
                objDia = {
                  number:i,
                  folga:true
                }
              }else{
                objDia = {
                  number:i,
                  folga:false  
                }
              }
              arrayObjDias.push(objDia);
          }
    
          //adiciona a array de dias   
          this.meses[i] = {
            número:i,
            nome:mesesDoAno[i],
            tamanho:tamanho,
            dias:arrayObjDias,
            primeiroDiaDaSemana:primeiroDiaDaSemana
          }
              switch(this.meses[i].primeiroDiaDaSemana){
                case 0:
                diasDaSemana = ['dom','seg','ter','qua','qui','sex','sáb']
                break
    
                case 1:
                diasDaSemana = ['seg','ter','qua','qui','sex','sáb','dom']
                break
    
                case 2:
                diasDaSemana = ['ter','qua','qui','sex','sáb','dom','seg']
                break
    
                case 3:
                diasDaSemana = ['qua','qui','sex','sáb','dom','seg','ter']
                break
    
                case 4:
                diasDaSemana = ['qui','sex','sáb','dom','seg','ter','qua']
                break
    
                case 5:
                diasDaSemana = ['sex','sáb','dom','seg','ter','qua','qui']
                break
    
                case 6:
                diasDaSemana = ['sáb','dom','seg','ter','qua','qui','sex']
                break
            }
            this.meses[i].diasDaSemana = diasDaSemana
            this.meses[i].últimaFolga = mesFiltrado[mesFiltrado.length-1]
            this.meses[i].diasParaFimDoMes = tamanho-this.meses[i].últimaFolga
        }
    }
}

//funções
function filtrarDias(arrayDias,diaBase){
    let index=diaBase
    let somadores = [0,1,8,9,16,17,24,25]
    let somados = somadores.map((somador)=>somador+diaBase)
    let diasFiltrados = [];
    for(dia of arrayDias){
        if(somados.includes(dia)){
            diasFiltrados.push(dia);
        }
    }
    return diasFiltrados
}
function criarCalendário(ano,folga){
    const calendário = new Calendário(ano,folga)
    return calendário
}

function mostrarCalendário(calendário,mês){
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    diasDaSemana = calendário.meses[mês].diasDaSemana;
    
    diasDaSemana.forEach((dia)=>{
        const novaCelulaHead = document.createElement('th');
        novaCelulaHead.textContent = dia;
        novaCelulaHead.style.border = 'solid';
        novaCelulaHead.style.width = '50px';
        novaCelulaHead.style.backgroundColor = 'rgba(0,230,0)';
        headRow.appendChild(novaCelulaHead);
        tableHead.appendChild(headRow);
        table.appendChild(tableHead)
    })

    const tableBody = document.createElement('tbody');
    let bodyRow = document.createElement('tr');
    
    for(dia of calendário.meses[mês].dias){
        if(bodyRow.cells.length>=7){
            bodyRow = document.createElement('tr');
        }
    
    const novaCelulaBody = document.createElement('th');
    novaCelulaBody.textContent = dia.number;
    novaCelulaBody.style.border = 'solid';
    novaCelulaBody.style.width = '50px';
        novaCelulaBody.style.backgroundColor = 'rgba(200,200,200)';
    if(dia.folga){
        novaCelulaBody.style.backgroundColor = 'rgba(200,0,0)';
    }
    bodyRow.appendChild(novaCelulaBody);
    tableBody.appendChild(bodyRow);
    table.appendChild(tableBody);
    }
    
    const título = document.createElement('h1');
    título.textContent = `${mesesDoAno[mês]} de ${calendário.ano}`;
    document.body.appendChild(título);
    document.body.appendChild(table)
}

//testes
//classe - Calendário(ano,diaPrimeiraFolga)

const inputAno = document.createElement('input');
const inputMês = document.createElement('input');
const inputFolga = document.createElement('input');
const botão = document.createElement('button');
inputAno.placeholder = 'ano';
inputMês.placeholder = 'mês';
inputFolga.placeholder = 'folga';
botão.textContent = 'gerar';

//
botão.addEventListener('click',
function(){
    //limpa a página
    while(document.body.firstChild){
        document.body.removeChild(document.body.firstChild);
    }
    //cria os elementos novamente
    document.body.appendChild(inputAno);
    document.body.appendChild(inputMês);
    document.body.appendChild(inputFolga);
    document.body.appendChild(botão);
    
    let ano = Number(inputAno.value);
    let mês = null;
    //tratar o input de mês
    switch(inputMês.value.trim().toLowerCase()){
        case 'janeiro':
        mês = 0
        break
        
        case 'fevereiro':
        mês = 1
        break
        
        case 'março':
        mês = 2
        break
        
        case 'abril':
        mês = 3
        break
        
        case 'maio':
        mês = 4
        break
        
        case 'junho':
        mês = 5
        break
        
        case 'julho':
        mês = 6
        break
        
        case 'agosto':
        mês = 7
        break
        
        case 'setembro':
        mês = 8
        break
        
        case 'outubro':
        mês = 9
        break
        
        case 'novembro':
        mês = 10 
        break
        
        case 'dezembro':
        mês = 11
        break
        
        default:
        mês = 0
    }
    let folga = Number(inputFolga.value);
    let próximaFolga = 1;
    //checa se a folga foi informada
    if(folga){
        let calendário = criarCalendário(ano,folga);
        
        //setar o número de repetições de acordo com a quantidade de meses para o fim do ano
        let repetições = 12 - calendário.meses[mês].número;
        for(let i=0;i<repetições;i++){
            mostrarCalendário(criarCalendário(ano,folga),mês,folga);
            calendário = criarCalendário(ano,folga)
            folga = 7 - calendário.meses[mês].diasParaFimDoMes;
            mês++
        }
        
        //resetar ano e mês
        ano++;
        mês = 0;
        
        calendário2 = criarCalendário(ano+1,folga);
        for(let i=0;i<=Object.keys(calendário2.meses).length-1;i++){
            console.log(mês)
            mostrarCalendário(criarCalendário(ano,folga),mês,folga);
            calendário2 = criarCalendário(ano,folga);
            folga = 7 - calendário2.meses[mês].diasParaFimDoMes;
            mês++
        }
        inputAno.value = '';
        inputMês.value = '';
        inputFolga.value = '';
        
    }else{
        let calendário = criarCalendário(ano,folga);
        for(let i=0;i<Object.keys(calendário.meses).length;i++){
            mostrarCalendário(criarCalendário(ano),mês);
            mês++;
        }
        inputAno.value = '';
        inputMês.value = '';
        inputFolga.value = '';
    }
})

document.body.style.backgroundColor = ('rgba(150,150,150)')
document.body.appendChild(inputAno);
document.body.appendChild(inputMês);
document.body.appendChild(inputFolga);
document.body.appendChild(botão);

//criarCalendário(ano,folga)
mostrarCalendário(criarCalendário(2023),new Date().getMonth());




