const deck = document.getElementById("card-deck");
const starredDeck = document.getElementById("starred-deck");

let starred = [];

function renderCards(array) {
  deck.innerHTML = "";

  if(array.length < 1){
    let card = document.createElement("div");
    card.id="empty"
    card.classList = `card p-0 pt-2 col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 m-3 `;
    card.innerHTML=`<img src="./img/empty.svg" class="card-img-top" alt="Empty box" title="Work illustrations by Storyset.com" />
    <div class="card-body">
    <h5 class="card-title">Oops...</h5>
    <p class="card-text">No hay personajes agregados a favoritos</p>

  </div>`
    deck.appendChild(card)

  }else{

   array.forEach((character) => {
        let card = document.createElement("div");
        card.classList = `card p-0 pt-2 col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 m-3 text-light ${character.house || "houseless"}`;
        card.innerHTML = `            
  <img src="${character.image}" class="card-img-top" alt="${character.name}" />
  <div class="card-body">
    <h5 class="card-title">${character.name}</h5>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">House: <br> <span class="ms-3">${
      character.house
    }</span></li>
    <li class="list-group-item">Patronus: <br> <span class="ms-3">${
      character.patronus || "Unknown"
    }</span></li>
      <li class="list-group-item">Actor: <br> <span class="ms-3">${
        character.actor
      }</span></li>
  </ul>

  </div>

`;
let cardFooter = document.createElement("div")
cardFooter.classList="card-footer text-center bg-dark"
cardFooter.innerHTML=` ${
  starred.includes(character.name)
    ? `<i class="bi ⭐ bi-star-fill text-warning size-5" ></i>`
    : `<i class="bi ⭐ bi-star text-warning size-5"></i>`
}    `
        cardFooter.addEventListener("click", () => {
          toggleFav(character.name);
        });
        card.appendChild(cardFooter)
        deck.appendChild(card);
      });
  }

}

function obtenerLocalStorage() {
  if (localStorage.getItem("starred")) {
    starred = JSON.parse(localStorage.getItem("starred"));
  }
}

function guardarLocalStorage() {
  localStorage.setItem("starred", JSON.stringify(starred));
}

function toggleFav(item) {
  starred.includes(item)
    ? starred.splice(starred.indexOf(item), 1)
    : starred.push(item);
  guardarLocalStorage();
  obtenerLocalStorage();
  renderCards(selectData());
}

obtenerLocalStorage();

renderCards(selectData());

function selectData() {
  let params = new URLSearchParams(document.location.search.substring(1));
  let house = params.get("house");
  let filteredCharacters = characters.filter(
    (character) => character.house === house || house === "Everyone"
  );
  document.getElementById("house-title") &&
    (document.getElementById("house-title").innerText = house);
  return starredDeck
    ? characters.filter((character) => starred.includes(character.name))
    : filteredCharacters;
}
