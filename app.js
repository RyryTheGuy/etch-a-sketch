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
    tile.addEventListener("mouseenter", changeGridTile);
    // Append the tile to the grid container
    gridContainer.appendChild(tile);
  }
  // Append the grid container to the html page
  let sketchArea = document.querySelector("#sketch");
  sketchArea.appendChild(gridContainer);
})();

function changeGridTile(e) {
  // Change the hovered tile's background to black
  e.target.style.backgroundColor = "black";
}
