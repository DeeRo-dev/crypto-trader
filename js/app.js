const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const objBusqueda = {
    moneda: '',
    criptomoneda:'',
}
const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas) 
});



document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptoMonedas()
    formulario.addEventListener('submit', submitFormulario);
    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
});

function consultarCriptoMonedas (){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
        .then(response => response.json())
         .then(respuesta => obtenerCriptomonedas(respuesta.Data))
         .then( criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach( cripto => {
        const { FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option)
    });
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value
    console.log(objBusqueda)
}
function submitFormulario(e){
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda;
    if (moneda == '' || criptomoneda == '') {
        mostrarAlerta('ambos son necesarios para consultar');
        return;
    }
}

function mostrarAlerta(msg){
     alert(msg)
}