function returnCard(pokemonName, bgColor, details, displayName, id) {
  return `
        <div class="card" id="small-${pokemonName}" onclick="showPokemonDetails('${pokemonName}', '${id}')">
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
}

function returnType(pokemonType) {
  return `
        <div class="typeicon ${pokemonType}">
           <img src="./icons/type/${pokemonType}.svg" alt="" />
        </div>`;
}

function returnPokemonDetailsCard(id, bgColor, details, pokemonName) {
  return `
    <div class="detailview" id="detailview-${id}" onclick="event.stopPropagation()">
        <div class="top-details-container" style="background-color:${bgColor}">
          <img
            src="${details["spriteUrl"]}"
            alt=""
          />
          <div><h2>${pokemonName}</h2></div>
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
}
