const gameContainer = document.getElementById("game-container");
const images = document.getElementById("images").children;

var score = 0;

LoadSquares();
ResetGame();

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

function GameLogic(){
    let choices = [];
    let readyToAdd = true;
    for (let i = 0; i < getSquareArray().length; i++) {
        
        getSquare(i).addEventListener('click',() => addChoice(getSquare(i)))
    }

    function addChoice(sqr)
    {
        let img = sqr.firstElementChild;

        if(choices[0] === undefined)
        {
            if(readyToAdd && img.className !== "image clone guessed" && img.className !== "image guessed"){
                add();
            }
        }
        else
        {
            if(readyToAdd && choices[0].parentElement != sqr && img.className !== "image guessed" && img.className !== "image clone guessed"){
                add();
            }
        }
        

        function add() {
            
            console.log("showing image");
            img.style.display = "flex";
            choices.push(img);
            checkChoice();
        }
    }
    
    function checkChoice()
    {
        
        if(choices.length == 2)
        {
            readyToAdd = false;
            if(choices[0].getAttribute("src") === choices[1].getAttribute("src"))
            {
                choices[0].classList.add("guessed");
                choices[1].classList.add("guessed");
                score++;
                choices = [];
                readyToAdd = true;
            }
            else{
                setTimeout(hideImages,750);
            }
            function hideImages(){
                choices[0].style.display = "none";
                choices[1].style.display = "none";
                choices = [];
                readyToAdd = true;
            }
        }
    }
}

function LinkImages(){
    let sqr = getSquareArray();
    
    for (let i = 0; i < 6; i++) {
        let clone = images[0].cloneNode(true);
        clone.classList.add("clone");
        let imgarr = [images[0],clone];
        for (let b = 0; b < 2; b++) {
            let random = getRandomInt(0,sqr.length);
            sqr[random].appendChild(imgarr[b]);
            sqr.splice(random,1);
        }
    }
}

function ResetGame(){
    hideAllImages();

    LinkImages();
    GameLogic();

    function hideAllImages()
    {
        let imagecontainer = document.getElementById("images");

        document.querySelectorAll('.clone').forEach(img => {
            img.remove();
        });

        document.querySelectorAll('.guessed').forEach(img => {
            img.classList.remove('guessed');
        });

        let placedimages = document.querySelectorAll(".image");
        
        placedimages.forEach(element => {
            element.style.display = "none";
            imagecontainer.appendChild(element);
        });

    }
}
//aux functions

function getSquare(index){
    return gameContainer.children[index].firstElementChild;
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