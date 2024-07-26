function addOverlayEventListeners(overlay, id) {
  overlay.addEventListener("touchstart", (evt) => {
    touchstartX = evt.changedTouches[0].screenX;
    touchstartY = evt.changedTouches[0].screenY;
  });
  overlay.addEventListener("touchend", (evt) => {
    touchendX = evt.changedTouches[0].screenX;
    touchendY = evt.changedTouches[0].screenY;
    whichDirection(id);
  });
}

function whichDirection(id) {
  if (touchendX < touchstartX) swipeToNext(Number(id) + 1);
  if (touchendX > touchstartX) swipeToPrevious(Number(id) - 1);
  if (
    touchendY - touchstartY > 150 &&
    Math.abs(touchendX - touchstartX) < touchendY - touchstartY
  )
    closeOverlay("detailview-overlay");
}

function swipeToPrevious(id) {
  if (id >= 0) showFollowUpPokemon(null, id);
}

async function swipeToNext(id) {
  let isLastElement = await checkForLastElement(id);
  if (!isLastElement) showFollowUpPokemon(null, id);
}
