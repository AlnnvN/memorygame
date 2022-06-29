const gameContainer = document.getElementById("game-container");
const images = document.getElementById("images").children;

LoadSquares();
LinkImages();



//FUNCTIONS

function LoadSquares (){
    for (let i = 0; i < 12; i++) {
        let sqrDiv = document.createElement("div");//create sqr div
        sqrDiv.classList.add("square-div");
        gameContainer.appendChild(sqrDiv);

        let sqr = document.createElement("div");//create sqr
        sqr.classList.add("square");
        sqrDiv.appendChild(sqr);
    }
}

function LinkImages(){
    let sqr = getSquareArray();
    
    for (let i = 0; i < 6; i++) {
        let imgarr = [images[0],images[0].cloneNode(true)];
        for (let b = 0; b < 2; b++) {
            let random = getRandomInt(0,sqr.length);
            sqr[random].appendChild(imgarr[b]);
            sqr.splice(random,1);
            console.log(sqr.length);
        }
    }
    

}

//aux functions

function getSquare(index){
    return gameContainer.children[index].children;
}

function getSquareArray(){
    let sqr = []
    for (let i = 0; i < gameContainer.children.length; i++) {
        sqr.push(gameContainer.children[i].firstElementChild);
    }
    return sqr;
}

function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}