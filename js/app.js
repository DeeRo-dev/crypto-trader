const criptomonedasSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};
const obtenerCriptomonedas = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptoMonedas();
  formulario.addEventListener("submit", submitFormulario);
  criptomonedasSelect.addEventListener("change", leerValor);
  monedaSelect.addEventListener("change", leerValor);
});

function consultarCriptoMonedas() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
  fetch(url)
    .then((response) => response.json())
    .then((respuesta) => obtenerCriptomonedas(respuesta.Data))
    .then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptomonedasSelect.appendChild(option);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
  console.log(objBusqueda);
}
function submitFormulario(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objBusqueda;
  if (moneda == "" || criptomoneda == "") {
    mostrarAlerta("ambos son necesarios para consultar");
    return;
  }

  consultarApi();
}

function mostrarAlerta(msg) {
  const existeAlerta = document.querySelector(".error");
  if (!existeAlerta) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("error");
    divMensaje.textContent = msg;
    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 2000);
  }
}


function consultarApi(){
    const { moneda, criptomoneda}= objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    mostrarSpinner();
    fetch(url)
    .then (respuesta => respuesta.json())
    .then(cotizacion => {
        mostrarCotizacionHtml(cotizacion.DISPLAY[criptomoneda][moneda])
    })
}

function mostrarCotizacionHtml(cotizacion){
    limpiarHtml();
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;
    const precio = document.createElement('p')
    precio.classList.add('precio');
    precio.innerHTML= `El precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `<p>El precio mas alto del dia es de: <span> ${HIGHDAY}</span></p> `;

    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `<p>El precio mas bajo del dia es de: <span> ${LOWDAY}</span></p> `;

    const ultimasHoras = document.createElement('p')
    ultimasHoras.innerHTML = `<p>Variacion en las ultimas 24hs:<span> ${CHANGEPCT24HOUR}%</span></p> `;
    
    const ultimaActualizacion = document.createElement('p')
    ultimaActualizacion.innerHTML = `<p>Ultima actualizacion:<span> ${LASTUPDATE}</span></p> `;

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)
}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}
 function mostrarSpinner(){
    limpiarHtml();
    const spinner = document.createElement('div')
    spinner.classList.add('spinner');
    spinner.innerHTML=`
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `
    resultado.appendChild(spinner);
 }