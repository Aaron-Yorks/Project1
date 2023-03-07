//Define your constants
const tilesContainer = document.querySelector(".tiles");
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "gold"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

//Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false; //this means that when you click on the tile again the color doesn't disappear
let totalWins = 0;
let totalLoses = 0;



// Makes a div class in JS instead of HTML
function buildTile(color) {
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");
// Add an event listener so something happens when you click on a tile
    element.addEventListener("click", () => {
        if (awaitingEndOfMove) {
            return;
        }
// the event listener above makes sure that even if you get a move wrong, it doesn't tell you the answer
        element.style.backgroundColor = color;

        if (!activeTile) {
            activeTile = element;

            return;
        }
        // this above makes it so when you click on one tile, then go click another, the console saves the first tile's info so it can see if they are a match or not

        const colorToMatch = activeTile.getAttribute("data-color");

        if (colorToMatch === color) {
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");

            awaitingEndOfMove = false; 
            activeTile = null;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                totalWins++
                document.querySelector("#wincount").innerHTML = totalWins
            }

            return;
        }



        // you need to set awaitingEndOfMove to true incase the user got their match wrong. Set a timer to reset the tiles after. 
        awaitingEndOfMove = true;

        setTimeout(() => {
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;
            awaitingEndOfMove = false; 
            activeTile = null;
        }, 1000);
        // this below will grab and save the second tile's info so we can make a function to see if they match.
    });


    return element;
}



//build up tiles using a for loop
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color);
   
    colorsPicklist.splice(randomIndex, 1);
    tilesContainer.appendChild(tile);
    
}


