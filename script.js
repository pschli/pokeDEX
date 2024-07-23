const typeColors = {
  none: ["", ""],
  bug: ["#92bc2c", "#d9f88f"],
  dark: ["#595761", "#b2adc4"],
  dragon: ["#0c69c8", "#7dafe1"],
  electric: ["#f2d94e", "#f0e7b2"],
  fire: ["#fba54c", "#f6d5b3"],
  fairy: ["#ee90e6", "#d3bad1"],
  fighting: ["#d3425f", "#e79dac"],
  flying: ["#a1bbec", "#cfd7e8"],
  ghost: ["#5f6dbc", "#b3bced"],
  grass: ["#5fbd58", "#a2ee9d"],
  ground: ["#da7c4d", "#ecb59a"],
  ice: ["#75d0c1", "#bbece4"],
  normal: ["#a0a29f", "#d6d7d5"],
  poison: ["#b763cf", "#d9aee5"],
  psychic: ["#fa8581", "#f0c0be"],
  rock: ["#c9bb8a", "#d1cdbd"],
  steel: ["#5695a3", "#aacad2"],
  water: ["#539ddf", "#a4ccf0"],
};

let allPokemon = {};
let pokemonDetails = {};

let offset = 0;

async function init() {
  await getAllPokemon();
  displayPokemon();
}

async function getAllPokemon() {
  let fetchedData = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  allPokemon = await fetchedData.json();
  allPokemon = await allPokemon.results;
  return;
}

async function displayPokemon() {
  for (let i = offset; i < offset + 24 && i < allPokemon.length; i++) {
    let pokemonDetail;
    let pokemonName = allPokemon[i].name;
    pokemonDetail = await getPokemonDetails(pokemonName);
    if (pokemonDetail == true) {
      renderPokemonCard(pokemonName);
    }
  }
  offset += 24;
  return;
}

function renderPokemonCard(pokemonName) {
  let container = document.getElementById("content");
  let details = pokemonDetails[pokemonName];
  let pokemonType = details.type[0];
  let bgColor = typeColors[pokemonType][0];
  let displayName = capitalizeString(pokemonName);
  container.innerHTML += `<div class="card" id="small-${pokemonName}">
          <div class="card-top-area" style="background-color:${bgColor}" id="top-${pokemonName}">
            <img
              src="${details.spriteUrl}"
              alt="${pokemonName} picture"
            />
          </div>
          <div class="card-bottom-area" id="bottom-${pokemonName}">
            <h3>${displayName}</h3>
            <div class="types" id="types-${pokemonName}">
            </div>
          </div>
        </div>`;
  container = document.getElementById(`types-${pokemonName}`);
  for (let i = 0; i < details.type.length; i++) {
    pokemonType = details.type[i];
    container.innerHTML += `
        <div class="typeicon ${pokemonType}">
           <img src="./icons/type/${pokemonType}.svg" alt="" />
        </div>`;
  }
}

async function getPokemonDetails(pokemonName) {
  let pokemonDetail;
  let fetchUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  if (pokemonDetails[pokemonName] == undefined) {
    pokemonDetail = await fetch(fetchUrl);
    let pokeData = await pokemonDetail.json();
    await structurePokemonDetails(pokemonName, pokeData);
    return true;
  } else return true;
}

async function structurePokemonDetails(pokeName, pokemonData) {
  let pokeType = await getTypeFromData(pokemonData);
  let pokeStats = await getStatsFromData(pokemonData);
  let spriteUrl = pokemonData.sprites.other["official-artwork"].front_default;
  let audioUrl = pokemonData.cries.latest;
  await createDetailsObject(pokeName, pokeType, pokeStats, spriteUrl, audioUrl);
}

async function createDetailsObject(pName, pType, pStats, sprite, audio) {
  let newDetails = {
    [pName]: {
      type: pType,
      baseXp: pStats[0],
      health: pStats[1],
      attack: pStats[2],
      defense: pStats[3],
      spAttack: pStats[4],
      spDefense: pStats[5],
      speed: pStats[6],
      spriteUrl: sprite,
      audioUrl: audio,
    },
  };
  Object.assign(pokemonDetails, newDetails);
}

async function getTypeFromData(pokemonData) {
  let pokeType = [];
  for (let i = 0; i < pokemonData.types.length; i++) {
    pokeType.push(pokemonData.types[i].type.name);
  }
  return pokeType;
}

async function getStatsFromData(pokemonData) {
  let pokeStats = [];
  pokeStats.push(pokemonData.base_experience);
  pokeStats.push(pokemonData.height);
  for (let i = 0; i < 6; i++) {
    pokeStats.push(pokemonData.stats[i]["base_stat"]);
  }
  return pokeStats;
}

async function selectType(pokemonType) {
  changeColors(pokemonType);
  if (pokemonType != "none") {
  }
  return;
}

function changeColors(color) {
  document.getElementById(
    "body"
  ).style.backgroundColor = `${typeColors[color][1]}`;
  document.getElementById(
    "header"
  ).style.backgroundColor = `${typeColors[color][0]}`;
}

function createOverlay(id) {
  let parent = document.getElementById("main");
  let overlay = elementBuilder(parent, "div", "overlay", id);
  return overlay;
}

function elementBuilder(parent, childType, childClass, childID = "") {
  let child = document.createElement(childType);
  child.className = childClass;
  child.id = childID;
  parent.appendChild(child);
  return child;
}

function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
