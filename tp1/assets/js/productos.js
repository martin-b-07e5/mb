/* The Document method querySelector() returns the first Element within the
  document that matches the specified selector, or group of selectors.
 If no matches are found, null is returned.
 https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
*/

// 👇 Busco en el DOM el boton para listar
const $botonListar = document.querySelector('#xBotonListar');
// 👇 Busco en el DOM el elemento donde voy a insertar los productos en el HTML
const $sectionListado = document.querySelector('#xProductos');
// 👇 Defino en una constante la url del servicio, donde voy a consultar por el listado de productos. (url de la API)
// const PRODUCTOS_URL = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json';
const PRODUCTOS_URL = './assets/json/products.json';


// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// 👇 Function para buscar los productos en un servicio
const buscarProductos = async () => {
    const productos = await fetch(PRODUCTOS_URL);  // 👈 Llamo con el método del navegador fetch
    return productos.json();  // 👈 Retorno en formato json la respusta del servicio
};


// 👇 Método para crear el html de productos
const crearHTMLListaDeProductos = (productos) => {
    // 👇 Iterar POR CADA PRODUCTO
    const listaLis = productos.map(producto => {
        const { image, type, name, price } = producto;
        // Con cada producto crear un objeto li »» A cada objeto li voy a agrergar la informacion del producto
            // <div class="sticky">
            // </div>
        const li = `
        <li>
              <section class="subtitulo">
                <table>
                  <tr>
                    <td width="10%""><img src="./assets/img/${type}.png" title="Type: ${type}"></td>
                    <td>${name}</td>
                  </tr>
                </table>
              </section>

            <img src="./assets/img/${image}" title="${name}">

            <p> <strong>Type:</strong> ${type} </p>
            <p> <strong>Name:</strong> ${name} </p>
            <p> <strong>Price:</strong> € ${price} </p>
        </li>
        `;
        return li;
    });
    // Creamos el elemento UL de la lista con los elementos li
    const ulElement = `
        <ul class="xListado">
            ${listaLis.reduce((previo, actual) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        return `
                    ${previo}
                    ${actual}
                `
    }, '')}
        </ul>
    `;
    return ulElement;
};


// Funcion manejadora de evento (Event Handler)
const manejadorDeEventoClick = async (evento) => {

    // Evito propagar el evento a los padres para evitar efectos secundarios
    evento.stopPropagation();

    // Busco los productos
    const productos = await buscarProductos();

    // Mostrar en el html los productos
    const listadoHTML = crearHTMLListaDeProductos(productos);

    // Agrego mi listado html en el html de la section;
    $sectionListado.innerHTML = listadoHTML;

    // Remover el evento para evitar efectos secundarios
    $botonListar.removeEventListener('click', manejadorDeEventoClick);
    // 👇 Desactivo el boton
    // $botonListar.setAttribute('disabled', 'disabled');
    // 👇 Oculto el boton
    $botonListar.setAttribute('hidden', 'hidden');
};


// Agrego el evento click a la funcion manejadorDeEventoClick
$botonListar.addEventListener('click', manejadorDeEventoClick);

// Ejemplo de Event Delegation
// https://javascript.info/event-delegation
//$sectionListado.addEventListener('click', (evento) => {
//    console.log(evento.currentTarget);
//    window.open(`https://www.google.com?q=${evento.target}`)
//})
