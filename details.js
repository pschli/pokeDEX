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
  console.log(id);
  let isLastElement = await checkForLastElement(id);
  if (isLastElement)
    overlay.innerHTML += `<div class="arrow next invisible"></div>`;
  else
    overlay.innerHTML += `<div class="arrow next" onclick="showPreviousPokemon(event, ${id})"></div>`;
}

async function checkForLastElement(id) {
  if (
    (currentSelectedType == "none" && id < allPokemon.length) ||
    (currentSelectedType != "none" && id < activePokemonSource.length)
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
  if (currentSelectedType == "none") return allPokemon[id].name;
  else return activePokemonSource[id].name;
}

function createPokemonDetailsCard(overlay, pokemonName, id) {
  let details = pokemonDetails[pokemonName];
  let bgColor = typeColors[details.type[0]][0];
  addBackArrow(overlay, Number(id) - 1);
  overlay.innerHTML += `
    <div class="detailview" id="detailview-${id}" onclick="event.stopPropagation()">
        <div class="top-details-container" style="background-color:${bgColor}">
          <img
            src="${details["spriteUrl"]}"
            alt=""
          />
        </div>
        <div class="bottom-details-container">
          <div class="navtabs">
            <button id="b1" class="active-tab" onclick="toggleTab(event, '1')">
              Stats</button
            ><button id="b2" onclick="toggleTab(event, '2')">Fight</button
            ><button id="b3" onclick="toggleTab(event, '3')">Evolution</button>
          </div>
          <div class="details-text" id="details1">
            <div class="details-content">
              <table class="bar-table">
                <div class="d-flex" id="type-details">
                <div>Type:&nbsp;</div>
                </div>
                <tr>
                  <td class="label">Height: </td>
                  <td class="value-number">${details["height"]}</td>
                </tr>
                <tr>
                  <td class="label">Weight: </td>
                  <td class="value-number">${details["weight"]}</td>
                </tr>
                <tr>
                  <td class="label">Base-XP</td>
                  <td class="bar-cell">
                    <div class="value-bar" data-value="${details["baseXp"]}"></div>
                  </td>
                  <td class="value">${details["baseXp"]}</td>
                </tr>
                <tr>
                  <td class="label">Health</td>
                  <td class="bar-cell">
                    <div class="value-bar" data-value="${details["health"]}"></div>
                  </td>
                  <td class="value">${details["health"]}</td>
                </tr>

                <tr>
                  <td class="label">Speed</td>
                  <td class="bar-cell">
                    <div class="value-bar" data-value="${details["speed"]}"></div>
                  </td>
                  <td class="value">${details["speed"]}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="details-text d-none" id="details2">
            <div class="details-content">
              <table class="bar-table">
                <div class="d-flex" id="type-details2"></div>
                <tr>
                  <td class="label">Attack</td>
                  <td class="bar-cell">
                    <div class="value-bar" data-value="${details["attack"]}"></div>
                  </td>
                  <td class="value">${details["attack"]}</td>
                </tr>
                <tr>
                  <td class="label">Defense</td>
                  <td class="bar-cell">
                    <div class="value-bar" data-value="${details["defense"]}"></div>
                  </td>
                  <td class="value">${details["defense"]}</td>
                </tr>
                <tr>
                  <td class="label">Special-Attack</td>
                  <td class="bar-cell">
                    <div class="value-bar" data-value="${details["spAttack"]}"></div>
                  </td>
                  <td class="value">${details["spAttack"]}</td>
                </tr>
                <tr>
                  <td class="label">Special-Defense</td>
                  <td class="bar-cell">
                    <div class="value-bar" data-value="${details["spDefense"]}"></div>
                  </td>
                  <td class="value">${details["spDefense"]}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="details-text d-none" id="details3"></div>
        </div>
    </div>
  `;
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
