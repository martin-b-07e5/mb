/* The Document method querySelector() returns the first Element within the
    document that matches the specified selector, or group of selectors.
  If no matches are found, null is returned.
  https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
*/

const $listButton = document.querySelector('#listBtn');  // 👈 Search in the DOM the btnListar
const $sectionList1 = document.querySelector('#sectionA');
const $sectionList2 = document.querySelector('#sectionB');  // 👈 Search in the DOM for the element where to insert the superHeroes in the HTML.

// const SUPERHEROES_URL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
const SUPERHEROES_URL = './assets/json/superheroes.json';  // 👈 Set the API url to a CONSTANT.


// ✨ Function to search superHeroes in a service.
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const searchHeroes = async () => {
  const response = await fetch(SUPERHEROES_URL);  // 👈 Call with the fetch browser method
  return response.json();  // 👈 Return the response in json format from the service
};


const showHeroesTitle = (superheroes) => {
  const liElement = `
    <p> <strong>Home Town: </strong> ${superheroes.homeTown} </p>
    <p> <strong>Secret Base: </strong> ${superheroes.secretBase} </p>
    <p> <strong>Formed: </strong> ${superheroes.formed} </p>
  `;

  // console.log(liElement);
  return liElement;
};


const showHeroesDescription = (superheroes) => {

  const { members } = (superheroes);  // 👈 Iterate FOR EACH superhero
  // console.log(superheroes2);  // 👈 show the object

  const list_li = members.map(member => {
    const { name, age, powers, secretIdentity } = member;
    // console.log("🔥 powers");
    // console.log(powers);

    let text = "";
    function powersFunction() {
      for (const i of powers) {
        text += "&nbsp;&nbsp;&nbsp;&nbsp; • " + i + "<br>";
      }
      // console.log(text);
      return text;
    }

    // Con cada producto crear un objeto li » A cada objeto li agregar la informacion del producto
    const liElement = `
      <li>
        <section class="subtitle">
          <table>
            <tr>
              <td><strong>Secret Identity:</strong> ${secretIdentity}</td>
            </tr>
          </table>
        </section>
        <img src="./assets/img/${name}" title="${name}">
        <p> <strong>&nbsp;&nbsp;Name:</strong> ${name} </p>
        <p> <strong>&nbsp;&nbsp;Age:</strong> ${age} </p>
        <hr>
        <p><strong>&nbsp;&nbsp;Powers:</strong></p>
        <p>${powersFunction()}</p>
        </li>
        `;

    console.log("👇 liElement de superheroes2");
    console.log(liElement);
    return liElement;
  });

  // 👇 Creamos el elemento UL de la lista con los elementos li
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const ulElement = `
    <ul class="xListado">
      ${list_li.reduce((previousValue, currentValue) => {
    return `${previousValue} ${currentValue}`
  },
    '')}
    </ul>
  `;
  return ulElement;

};


// ---------- 1st Event Handler
const clickEventHandler = async (evento) => {

  evento.stopPropagation();  // stop propagation to the fathers.

  const searchHeroesC = await searchHeroes();
  // console.log("✨ searchHeroesC");

  const listHTML_Title = showHeroesTitle(searchHeroesC);
  const listHTML_Description = showHeroesDescription(searchHeroesC);

  $sectionList1.innerHTML = listHTML_Title;
  $sectionList2.innerHTML = listHTML_Description;  // Add the html generated code in the html section.

  $listButton.removeEventListener('click', clickEventHandler);

  $listButton.setAttribute('disabled', 'disabled');

};

// ---------- 2nd Add "event click" to event handler
$listButton.addEventListener('click', clickEventHandler);
