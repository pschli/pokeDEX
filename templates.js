function returnCard(pokemonName, bgColor, details, displayName) {
  return `
        <div class="card" id="small-${pokemonName}">
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
