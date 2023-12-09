// TODO write your code here

// Pseudocode
// 0. import Mustache ;)
import Mustache from "mustachejs";
// 1. Select elements (template, container)
// 2. grab the template, we need a string!! --> innerHTML
const template = document.querySelector("#cardTemplate").innerHTML;
const container = document.querySelector("#cardsContainer");

// Render Pokemon info
const renderFirstCard = () => {
  const infoTemplate = document.querySelector("#infoTemplate").innerHTML;
  const infoContainer = document.querySelector("#infoContainer");
  
  const firstCard = document.querySelector(".pokemon-card");
  
  const pokeInfo = {
    image: firstCard.querySelector(".pokemon-card-image").src,
    name: firstCard.querySelector(".pokemon-card-title").innerText,
    types: firstCard.querySelector(".pokemon-card-subtitle").innerText,
  }
  
  const infoCard = Mustache.render(infoTemplate, pokeInfo);
  infoContainer.insertAdjacentHTML("beforeend", infoCard);
}

// 3. Fetch the data to get an array of pokemons! -> https://pokeapi.co/api/v2/pokemon
fetch("https://pokeapi.co/api/v2/pokemon")
  .then(response => response.json())
  .then((data) => {
    // console.log(data);
    // 4. Iterate through data.results
    data.results.forEach((poke) => {
      // 5. Do another fetch to get pokemon data -> https://pokeapi.co/api/v2/pokemon/1/
      fetch(poke.url)
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          const pokeInfo = {
            image: data.sprites.other.dream_world.front_default,
            name: data.name,
            types: data.types[0].type.name,
          }
          // 6. calling Mustache render with template string and the data object -> string
          const results = Mustache.render( template, pokeInfo );
          // 7. use insertAdjacentHTML to add rendered card into the container
          container.insertAdjacentHTML("beforeend", results);

          renderFirstCard();
        })
    });
  })

