function extractEvolutionStages(root) {
  let evoChain = [];
  let evoItem = root.species.name;
  evoChain.push(evoItem);
  let nextRoot = root.evolves_to[0];
  if (nextRoot) evoChain.push(extractEvolutionStages(nextRoot).flat());
  return evoChain;
}

async function getEvolutionChain(pokemonName) {
  let fetchedData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  let pokemonData = await fetchedData.json();
  let speciesUrl = await pokemonData.species.url;
  fetchedData = await fetch(speciesUrl);
  pokemonData = await fetchedData.json();
  let evoUrl = await pokemonData.evolution_chain.url;
  fetchedData = await fetch(evoUrl);
  pokemonData = await fetchedData.json();
  return pokemonData;
}

async function getEvolutionStages(pokemonName) {
  let pokemonData = await getEvolutionChain(pokemonName);
  let stages = extractEvolutionStages(pokemonData.chain).flat();
  showEvolution(stages);
}

async function showEvolution(stages) {
  let evoDisplay = document.getElementById("evolutiontab");
  for (let i = 0; i < stages.length; i++) {
    await getPokemonDetails(stages[i]);
    let sprite = pokemonDetails[stages[i]].spriteUrl;
    evoDisplay.innerHTML += `<img class="evopic" src="${sprite}" alt="${stages[i]}">`;
    if (i < stages.length - 1)
      evoDisplay.innerHTML += `<img class="evo-arrow" src="./icons/arrow_right_alt_24dp_434343_FILL0_wght400_GRAD0_opsz24.svg" alt="arrow right">`;
  }
}
