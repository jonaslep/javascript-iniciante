

const screen = document.querySelector('.display');
const buttons = document.querySelector('.botoes');

let valorAtual = '';
let valorAnterior = '';
let opEscolhida = null;

const operacoes = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : "Erro",
    percent: (a, b) => (a/100) * b,
};


const botoesCalculadora = [
    { id: 'clear', label: 'C' },
    { id: 'percent', label: '%' },
    { id: 'divide', label: '/' },
    { id: 'backspace', label: '⌫' },

    { id: '7', label: '7' },
    { id: '8', label: '8' },
    { id: '9', label: '9' },
    { id: 'multiply', label: '*' },

    { id: '4', label: '4' },
    { id: '5', label: '5' },
    { id: '6', label: '6' },
    { id: 'subtract', label: '-' },

    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: 'add', label: '+' },

    { id: '0', label: '0' },
    { id: 'decimal', label: '.' },
    { id: 'equals', label: '=' }
];

botoesCalculadora.forEach( botao => {

    let $buttonElement = document.createElement('button');
    $buttonElement.classList.add('btn');
    $buttonElement.id = botao.id;
    $buttonElement.innerText = botao.label;

    $buttonElement.addEventListener('click', () => {
        const id = botao.id;

        if ( !isNaN(id) || id === 'decimal' ){
            valorAtual += botao.label;
            attDisplay(valorAtual);

        }else if ( operacoes[id] ){
            opEscolhida = id;
            valorAnterior = valorAtual;
            valorAtual = '';

        } else if ( id === 'equals' ){
            calcular();

        } else if ( id === 'clear' ){
            valorAtual = '';
            attDisplay(valorAtual);

        } else {
            let list = valorAtual.toString().split('');
            list.pop();
            valorAtual = parseFloat(list.join(''))
            attDisplay(valorAtual);            
        }
    })

    buttons.appendChild($buttonElement);

    
})

function attDisplay(valor){
    screen.innerText = valor;
}


function calcular() {

    const num1 = parseFloat(valorAnterior);
    const num2 = parseFloat(valorAtual);

    if (isNaN(num1) || isNaN(num2)) return;

    const resultado = operacoes[opEscolhida](num1, num2);
    valorAtual = resultado;

    attDisplay(resultado);
}
