const criptomonedasSelect = document.querySelector('#criptosmonedas');

document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptosMonedas()
});

function consultarCriptosMonedas (){
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR'
}