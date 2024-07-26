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
let activePokemonSource = {};
let searchList = {};
let pokemonDetails = {
  missing: {
    type: ["normal"],
    baseXp: 0,
    height: 0,
    weight: 0,
    health: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
    spriteUrl: "./img/3.svg",
    audioUrl: "audio",
  },
};
let currentSelectedType = "none";

let offset = 0;
let searchActive = false;
let nextPossible = false;
let previousPossible = false;

async function init() {
  await getListOfAllPokemon();
  displayPokemon();
}

async function getListOfAllPokemon() {
  let fetchedData = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  allPokemon = await fetchedData.json();
  allPokemon = await allPokemon.results;
  return;
}

async function displayPokemon(activeObject = allPokemon) {
  for (let i = offset; i < offset + 24 && i < activeObject.length; i++) {
    let pokemonDetail;
    let pokemonName = activeObject[i].name;
    pokemonDetail = await getPokemonDetails(pokemonName);
    if (pokemonDetail == true) {
      renderPokemonCard(pokemonName, i);
    }
  }
  offset += 24;
  return;
}

function displayMorePokemon() {
  currentSelectedType == "none"
    ? displayPokemon()
    : displayPokemon(activePokemonSource);
}

function renderPokemonCard(pokemonName, id) {
  let container = document.getElementById("content");
  let details = pokemonDetails[pokemonName];
  let pokemonType = details.type[0];
  let bgColor = typeColors[pokemonType][0];
  let displayName = capitalizeString(pokemonName);
  container.innerHTML += returnCard(
    pokemonName,
    bgColor,
    details,
    displayName,
    id
  );
  renderPokemonType(pokemonName, details);
}

function renderPokemonType(pokemonName, details) {
  container = document.getElementById(`types-${pokemonName}`);
  for (let i = 0; i < details.type.length; i++) {
    let pokemonType = details.type[i];
    container.innerHTML += returnType(pokemonType);
  }
}

async function getPokemonDetails(pokemonName) {
  let pokemonDetail;
  let fetchUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  if (pokemonDetails[pokemonName] == undefined) {
    pokemonDetail = await fetch(fetchUrl);
    let pokeData;
    try {
      pokeData = await pokemonDetail.json();
    } catch {}
    await structurePokemonDetails(pokemonName, pokeData);
    return true;
  } else return true;
}

async function structurePokemonDetails(pokeName, pokemonData) {
  if (!pokemonData) setDataForMissingDataset(pokeName);
  else {
    let pokeType = await getTypeFromData(pokemonData);
    let pokeStats = await getStatsFromData(pokemonData);
    let spriteUrl = pokemonData.sprites.other["official-artwork"].front_default;
    let audioUrl = pokemonData.cries.latest;
    await createDetailsObj(pokeName, pokeType, pokeStats, spriteUrl, audioUrl);
  }
}

function setDataForMissingDataset(pokeName) {
  let missingDetails = { [pokeName]: pokemonDetails.missing };
  Object.assign(pokemonDetails, missingDetails);
}

async function createDetailsObj(pName, pType, pStats, sprite, audio) {
  let newDetails = {
    [pName]: {
      type: pType,
      baseXp: pStats[0],
      height: pStats[1],
      weight: pStats[2],
      health: pStats[3],
      attack: pStats[4],
      defense: pStats[5],
      spAttack: pStats[6],
      spDefense: pStats[7],
      speed: pStats[8],
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
  pokeStats.push(pokemonData.weight);
  for (let i = 0; i < 6; i++) {
    pokeStats.push(pokemonData.stats[i]["base_stat"]);
  }
  return pokeStats;
}

async function selectType(pokemonType) {
  changeColors(pokemonType);
  if (pokemonType != "none" && pokemonType != currentSelectedType) {
    changePokemonType(pokemonType);
  } else if (pokemonType == "none" && pokemonType != currentSelectedType) {
    document.getElementById("content").innerHTML = "";
    currentSelectedType = pokemonType;
    offset = 0;
    displayPokemon();
  }
  document.getElementById("details-type-selector").open = false;
  return;
}

async function changePokemonType(pokemonType) {
  let pokemonsToShow = await fetch(
    `https://pokeapi.co/api/v2/type/${pokemonType}`
  );
  let dataToExtract = await pokemonsToShow.json();
  pokemonsToShow = await extractFromObject(dataToExtract);
  document.getElementById("content").innerHTML = "";
  currentSelectedType = pokemonType;
  offset = 0;
  activePokemonSource = pokemonsToShow;
  displayPokemon(activePokemonSource);
}

async function extractFromObject(dataToExtract) {
  let branchedObject = dataToExtract.pokemon;
  let justTheNames = {};
  justTheNames = branchedObject.map((item) => ({ name: item.pokemon.name }));
  return justTheNames;
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
  let parent = document.getElementById("body");
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
