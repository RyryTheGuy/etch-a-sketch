// IIFE to populate the grid
(function () {
  // Create a 16x16 grid
  createGrid(16);
  // Adding Reset, Normal Mode, and Rainbow Mode button events
  const resetButton = document.querySelector(".reset");
  const normalButton = document.querySelector(".normal");
  const rainbowButton = document.querySelector(".rainbow");
  resetButton.addEventListener("click", resetBoard);
  normalButton.addEventListener("click", changeMode);
  rainbowButton.addEventListener("click", changeMode);

  // Adding grid size change events
  const gridSizeInput = document.querySelector("#gridSize");
  const gridSizeMirror = document.querySelector("#gridSizeMirror");
  const gridSizeButton = document.querySelector(".change-size");
  gridSizeInput.value = "16";
  gridSizeMirror.value = "16";
  gridSizeInput.addEventListener("input", mirrorInputs);
  gridSizeInput.addEventListener("blur", validateSize);
  gridSizeButton.addEventListener("click", changeGridSize);
})();

// Creates or Changes the grid size to the specified size
function createGrid(size) {
  // Create a grid container
  let gridContainer = document.createElement("div");
  gridContainer.classList.add("grid");
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  // Create a 16 x 16 grid inside the grid container
  for (let i = 0; i < size * size; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    // Add an event listener to the tile
    tile.addEventListener("mouseenter", hoverTileColorNormal);
    // Append the tile to the grid container
    gridContainer.appendChild(tile);
  }

  // Remove grid if it already exists
  if (document.querySelector(".grid") !== null) {
    // Append the grid container to the html page
    let sketchArea = document.querySelector("#sketch");
    sketchArea.removeChild(sketchArea.firstChild);
    sketchArea.appendChild(gridContainer);
  } else {
    // Append the grid container to the html page
    let sketchArea = document.querySelector("#sketch");
    sketchArea.appendChild(gridContainer);
  }
}

// Change the hovered tile's background to black
function hoverTileColorNormal(e) {
  e.target.style.backgroundColor = "black";
}

// Change the hovered tile's background to a random color
function hoverTileColorRainbow(e) {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Resets the board to all white
function resetBoard() {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  tiles.forEach((tile) => (tile.style.backgroundColor = "#fff"));
}

// Changes what color the tiles change to based on what mode is pressed
function changeMode(e) {
  const normalButton = document.querySelector(".normal");
  const rainbowButton = document.querySelector(".rainbow");

  // Normal Button was clicked
  if (e.target.classList.contains("normal")) {
    // Do nothing if the normal button is already enabled
    if (normalButton.classList.contains("enabled")) return;

    // Enable the normal button and disable the rainbow button
    normalButton.classList.add("enabled");
    rainbowButton.classList.remove("enabled");
    // Change the text of the buttons to match what hover state the user is in
    normalButton.textContent = "Normal Mode : Enabled";
    rainbowButton.textContent = "Rainbow Mode : Disabled";
    // Change the hover event listener from rainbow to normal
    const tiles = Array.from(document.querySelectorAll(".tile"));
    tiles.forEach((tile) => {
      tile.removeEventListener("mouseenter", hoverTileColorRainbow);
      tile.addEventListener("mouseenter", hoverTileColorNormal);
    });
  }

  // Rainbow Button was clicked
  if (e.target.classList.contains("rainbow")) {
    // Do nothing if the rainbow button is already enabled
    if (rainbowButton.classList.contains("enabled")) return;

    // Enable the rainbow button and disable the normal button
    rainbowButton.classList.add("enabled");
    normalButton.classList.remove("enabled");
    // Change the text of the buttons to match what hover state the user is in
    normalButton.textContent = "Normal Mode : Disabled";
    rainbowButton.textContent = "Rainbow Mode : Enabled";
    // Change the hover event listener from normal to rainbow
    const tiles = Array.from(document.querySelectorAll(".tile"));
    tiles.forEach((tile) => {
      tile.removeEventListener("mouseenter", hoverTileColorNormal);
      tile.addEventListener("mouseenter", hoverTileColorRainbow);
    });
  }
}

// Mirror the user's inputs from the enabled input to the disabled one
function mirrorInputs(e) {
  // Mirror the number entered in the input
  const inputMirror = document.querySelector("#gridSizeMirror");
  // Don't allow any numbers in the hundreds
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
  }
  // Mirror the enabled input
  inputMirror.value = e.target.value;
}

// Validate the user input
function validateSize(e) {
  // Disabled input used to mirror the enabled input
  const inputMirror = document.querySelector("#gridSizeMirror");
  // Validate the size of the number
  if (e.target.value > 64 || e.target.value < 16) {
    // Show the error message
    const errorMsg = document.querySelector(".error-message");
    errorMsg.classList.remove("hidden");
    // Set both inputs to the max if the number entered is over the limit
    if (e.target.value > 64) {
      e.target.value = 64;
      inputMirror.value = 64;
    }
    // Set both inputs to the min if the number entered is less than the limit
    if (e.target.value < 16) {
      e.target.value = 16;
      inputMirror.value = 16;
    }
  } else {
    const errorMsg = document.querySelector(".error-message");
    errorMsg.classList.add("hidden");
  }
}

// Changes the grid size based on user input
function changeGridSize(e) {
  // User input to change grid size
  const inputSize = document.querySelector("#gridSize");
  // Do nothing if the number isn't within range somehow
  if (inputSize.value > 64 || inputSize.value < 16) return;

  // Allow the grid to be changed if it is within the range
  if (inputSize.value <= 64 && inputSize.value >= 16) {
    // Remove the error message if it is displaying
    const errorMsg = document.querySelector(".error-message");
    if (!errorMsg.classList.contains("hidden"))
      errorMsg.classList.add("hidden");

    // Create a grid the size the user selects
    createGrid(inputSize.value);
  }
}
