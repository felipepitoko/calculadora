let totalAtual = 0
let ultimoOperador
let buffer = '0';
const tela = document.querySelector('.screen');
// tela.textContent = 'Vadia pucta'

function buttonClick(value){
    if(isNaN(value)){
        console.log('Sinal',value)
        handleSymbol(value)
    }
    else{
        console.log('numero',value)
        handleNumber(value)
    }
}

function handleSymbol(value){
    switch(value){
        case 'C':
            buffer = '0'
            totalAtual = 0
            break;
        case '=':
            if (!ultimoOperador) return
            const proxNumero = buffer.substring(buffer.indexOf(ultimoOperador)+1,buffer.length)
            flushOperation(parseInt(proxNumero))
            ultimoOperador = null
            buffer = totalAtual
            totalAtual = 0
            break
        case '←':
            const ultimoCaracter = buffer.substring(buffer.length-1,buffer.length)
            console.log('quero apagar',ultimoCaracter)
            buffer = buffer.length === 1? buffer = '0' : buffer.substring(0, buffer.length-1)
            if(isNaN(ultimoCaracter)){
                ultimoOperador = null
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(value)  
            break;          
    }
}

function handleMath(symbol){
    console.log('Vou fazer uma conta de',symbol)
    if (buffer === '0') return

    if(totalAtual === 0){
        totalAtual = parseInt(buffer)        
        ultimoOperador = symbol
        buffer = buffer+symbol
        // console.log('Meu total agora é',totalAtual)
        // console.log('Ultimo operador:',ultimoOperador)
        // totalAtual = intBuffer
    }
    else{
        if(!ultimoOperador){
            ultimoOperador = symbol
            buffer = buffer+symbol
            return
        }
        const proxNumero = buffer.substring(buffer.indexOf(ultimoOperador)+1,buffer.length)
        // console.log('Tem numero pra eu contar?',isNaN(proxNumero),proxNumero)
        if(isNaN(proxNumero)) return
        // console.log('Quero contar',totalAtual,ultimoOperador,parseInt(proxNumero))
        flushOperation(parseInt(proxNumero))
        // console.log('Quanto deu a conta?',totalAtual)
        buffer = totalAtual+symbol
        ultimoOperador = symbol
    }    
    
}

function flushOperation(intBuffer){
    console.log('vou contar',buffer,ultimoOperador,intBuffer)
    if(ultimoOperador === '+'){
        totalAtual += intBuffer
    }
    else if(ultimoOperador === '−'){
        totalAtual -= intBuffer
    }
    else if(ultimoOperador === '×'){
        totalAtual *= intBuffer
    }
    else if(ultimoOperador === '÷'){
        totalAtual /= intBuffer
    }
}

function handleNumber(numberString){
    if(buffer === '0') buffer = numberString
    else buffer += numberString
}


function init(){
    // const tela = document.querySelector('.screen-content');
    // tela.appendChild('Vadia puta')
    const button = document.querySelectorAll(".calc-buttons")[0]
    // console.log(button)
    // console.log(button)
    button.addEventListener('click', (event)=>{
        // console.table({buffer,ultimoOperador,totalAtual})
        console.log('-----------------------------------')
        buttonClick(event.target.innerText)        
        tela.textContent = buffer;
        // alert('Vadia puta')
    })
}

init()