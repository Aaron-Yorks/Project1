//Define your constants
const tilesContainer = document.querySelector(".tiles");
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "gold"];
// Below is a spread operator, this will cause each color to appear twice in the console
const colorsPicklist = [...colors, ...colors];
//reference to the amount of tiles we have
const tileCount = colorsPicklist.length;

//Game state variables
// comments are meant to explain the code below them

// how many tiles does the user get correct?
let revealedCount = 0;
// the active tile refers to the tile the user clicked on, and are now looking for the next tile to match. This refers to the div itself
let activeTile = null;
//this means that when you click on the tile again the color doesn't disappear
let awaitingEndOfMove = false; 
let totalWins = 0;
let totalLoses = 0;

const resetButton = document.querySelector("button");

// Makes a div class in JS instead of HTML, this will take in a color and return it to the loop down below
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
// below means: we are not awaiting the end of move, so lets reveal the color
        element.style.backgroundColor = color;
// ! means the opposite- so there is no acrive tile
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
                deleteBoard ()
                resetBoard ()
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

   
//build up tiles using a for loop, build up tiles
//we need to ask the loop to get a random color using the math.random function


function resetBoard () {
    for (let i = 0; i < tileCount; i++) {
        const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
        const color = colorsPicklist[randomIndex];
        //the tiles should be in random order now because of the code above
        const tile = buildTile(color);
       // the splice method makes it so the console returns two colors randomly
        colorsPicklist.splice(randomIndex, 1);
        tilesContainer.appendChild(tile);
        
    }
}
resetBoard ()

function deleteBoard () {
    const allTiles = document.querySelectorAll(".tile")
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].remove ()
    }
}

resetButton.addEventListener("click",() => {
    deleteBoard()
    resetBoard()
})