function showPokemonDetails(pokemonName, id) {
  let overlay = createOverlay("detailview-overlay");
  overlay.onclick = function () {
    closeOverlay("detailview-overlay");
  };
  createPokemonDetailsCard(overlay, pokemonName, id);
}

function addBackArrow(overlay, id) {
  id >= 0
    ? (overlay.innerHTML += `<div class="arrow back" onclick="showPreviousPokemon(event, ${id})"></div>`)
    : `<div class="arrow back invisible"></div>`;
}

async function addNextArrow(overlay, id) {
  let isLastElement = await checkForLastElement(id);
  if (isLastElement)
    overlay.innerHTML += `<div class="arrow next invisible"></div>`;
  else
    overlay.innerHTML += `<div class="arrow next" onclick="showPreviousPokemon(event, ${id})"></div>`;
}

async function checkForLastElement(id) {
  if (
    (currentSelectedType == "none" &&
      id < allPokemon.length &&
      searchActive == false) ||
    (currentSelectedType != "none" &&
      id < activePokemonSource.length &&
      searchActive == false) ||
    (searchActive == true && id < searchList.length)
  ) {
    if (id == offset) displayMorePokemon();
    return false;
  } else return true;
}

function showPreviousPokemon(event, id) {
  event.stopPropagation();
  let overlay = document.getElementById("detailview-overlay");
  let pokemonName = pokemonToShow(id);
  overlay.innerHTML = "";
  createPokemonDetailsCard(overlay, pokemonName, id);
}

function pokemonToShow(id) {
  if (searchActive) return searchList[id].name;
  else {
    if (currentSelectedType == "none") return allPokemon[id].name;
    else return activePokemonSource[id].name;
  }
}

function createPokemonDetailsCard(overlay, pokemonName, id) {
  let details = pokemonDetails[pokemonName];
  let bgColor = typeColors[details.type[0]][0];
  addBackArrow(overlay, Number(id) - 1);
  overlay.innerHTML += returnPokemonDetailsCard(id, bgColor, details);
  addNextArrow(overlay, Number(id) + 1);
  addValueBars();
  addTypesToDetailView(details);
}

function addValueBars() {
  const bars = document.querySelectorAll(".value-bar");
  bars.forEach((bar) => {
    let value = bar.getAttribute("data-value");
    value = value / 2;
    if (value > 100) value = "100";
    bar.style.width = value + "%";
  });
}

function addTypesToDetailView(details) {
  let container = document.getElementById("type-details");
  for (let i = 0; i < details.type.length; i++) {
    let pokemonType = capitalizeString(details.type[i]);
    i > 0
      ? (container.innerHTML += `<div>,&nbsp;${pokemonType}</div>`)
      : (container.innerHTML += `<div>${pokemonType}</div>`);
  }
}

function toggleTab(event, target) {
  event.stopPropagation();
  toggleOldTab();
  tabButton = document.getElementById(`b${target}`);
  tabButton.classList.add("active-tab");
  tabContent = document.getElementById(`details${target}`);
  tabContent.classList.remove("d-none");
}

function toggleOldTab() {
  const tabs = document.querySelectorAll(".active-tab");
  tabs.forEach((tab) => {
    let oldId = tab.id;
    oldId = "details" + oldId.charAt(1);
    document.getElementById(oldId).classList.add("d-none");
    tab.classList.remove("active-tab");
  });
}

function closeOverlay(id) {
  document.getElementById(id).remove();
}
