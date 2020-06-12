// IIFE to populate the grid
(function () {
  // Create a grid container
  let gridContainer = document.createElement("div");
  gridContainer.classList.add("grid");
  // Create a 16 x 16 grid inside the grid container
  for (let i = 0; i < 256; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    // Add an event listener to the tile
    tile.addEventListener("mouseenter", hoverTileColorNormal);
    // Append the tile to the grid container
    gridContainer.appendChild(tile);
  }
  // Append the grid container to the html page
  let sketchArea = document.querySelector("#sketch");
  sketchArea.appendChild(gridContainer);

  // Adding Reset, Normal Mode, and Rainbow Mode button events
  const resetButton = document.querySelector(".reset");
  const normalButton = document.querySelector(".normal");
  const rainbowButton = document.querySelector(".rainbow");
  resetButton.addEventListener("click", resetBoard);
  normalButton.addEventListener("click", changeMode);
  rainbowButton.addEventListener("click", changeMode);
})();

function hoverTileColorNormal(e) {
  // Change the hovered tile's background to black
  e.target.style.backgroundColor = "black";
}

function hoverTileColorRainbow(e) {
  // Change the hovered tile's background to a random color
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function resetBoard() {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  tiles.forEach((tile) => (tile.style.backgroundColor = "#fff"));
}

function changeMode(e) {
  const normalButton = document.querySelector(".normal");
  const rainbowButton = document.querySelector(".rainbow");

  // Normal Button was clicked
  if (e.target.classList.contains("normal")) {
    if (normalButton.classList.contains("enabled")) return;

    normalButton.classList.add("enabled");
    rainbowButton.classList.remove("enabled");
    normalButton.textContent = "Normal Mode : Enabled";
    rainbowButton.textContent = "Rainbow Mode : Disabled";
    const tiles = Array.from(document.querySelectorAll(".tile"));
    tiles.forEach((tile) => {
      tile.removeEventListener("mouseenter", hoverTileColorRainbow);
      tile.addEventListener("mouseenter", hoverTileColorNormal);
    });
  }

  // Rainbow Button was clicked
  if (e.target.classList.contains("rainbow")) {
    if (rainbowButton.classList.contains("enabled")) return;

    rainbowButton.classList.add("enabled");
    normalButton.classList.remove("enabled");
    normalButton.textContent = "Normal Mode : Disabled";
    rainbowButton.textContent = "Rainbow Mode : Enabled";
    const tiles = Array.from(document.querySelectorAll(".tile"));
    tiles.forEach((tile) => {
      tile.removeEventListener("mouseenter", hoverTileColorNormal);
      tile.addEventListener("mouseenter", hoverTileColorRainbow);
    });
  }
}
