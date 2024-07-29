function engageSearch(searchString) {
  if (searchString.length > 0) showDeleteCross();
  if (searchString.length < 3) {
    return;
  } else {
    searchList = findMatching(searchString);
    document.getElementById("content").innerHTML = "";
    offset = 0;
    searchActive = true;
    displayPokemon(searchList);
    handleMoreButton(searchList);
  }
}

function findMatching(searchString) {
  let matching = [];
  if (currentSelectedType == "none") {
    matching = allPokemon.filter((pokemon) => {
      if (pokemon.name.startsWith(searchString.toLowerCase()) == true)
        return pokemon;
    });
  } else {
    matching = activePokemonSource.filter((pokemon) => {
      if (pokemon.name.startsWith(searchString.toLowerCase())) return pokemon;
    });
  }
  return matching;
}

function showDeleteCross() {
  document.getElementById("empty-search").classList.remove("d-none");
}

function emptySearch() {
  document.getElementById("search-input").value = "";
  document.getElementById("empty-search").classList.add("d-none");
  offset = 0;
  searchActive = false;
  document.getElementById("content").innerHTML = "";
  displayMorePokemon();
  document.getElementById("loadbutton").classList.remove("d-none");
}

function handleMoreButton(searchList) {
  if (searchList.length < 24) {
    document.getElementById("loadbutton").classList.add("d-none");
  }
}
