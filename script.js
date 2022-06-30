const gameContainer = document.getElementById("game-container");
const images = document.getElementById("images").children;
const sndBtn = document.getElementById("snd-btn");
const resetBtn = document.getElementById("reset-btn");
const scoreText = document.getElementById("score-number");
const attemptsText = document.getElementById("attempts-number");

var song = new Audio('./assets/musica do jogo da memoria.mp3');
var score = 0;
var userAttempts = 0;
var choices = [];
var isFirstTime = true;
var readyToAdd = true;

LoadIcons();
LoadSquares();
ResetGame();


//FUNCTIONS
function LoadIcons(){
    let restartIcon = document.getElementById("restart");
    let soundIcon = document.getElementById("sound");
    let mutedIcon = document.getElementById("muted");
    let iconContainer = document.getElementById("icons");
    let alternateCounter = 0;

    loadSoundBtn();

    loadResetBtn();

    //functions

    function loadResetBtn() {
        resetBtn.appendChild(restartIcon);

        resetBtn.addEventListener('click', () => {
            if(readyToAdd){
                ResetGame();
            }   
            
        });
    }

    function loadSoundBtn() {
        soundIcon.style.display = "none";
        mutedIcon.style.display = "flex";
        sndBtn.appendChild(mutedIcon);

        sndBtn.addEventListener('click', () => {
            if (alternateCounter === 0) {
                song.play();
            }

            if (alternateCounter % 2 === 0) {
                mutedIcon.style.display = "none";
                sndBtn.appendChild(soundIcon);
                soundIcon.style.display = "flex";
                iconContainer.appendChild(mutedIcon);
                song.play();
            }

            if (alternateCounter % 2 === 1) {
                mutedIcon.style.display = "flex";
                sndBtn.appendChild(mutedIcon);
                soundIcon.style.display = "none";
                iconContainer.appendChild(soundIcon);
                song.pause();
            }

            alternateCounter++;
        });
    }
}

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
    
    if(isFirstTime)
    {
        scoreText.innerHTML = "00/06"
        userAttempts.innerHTML = "00";
        for (let i = 0; i < getSquareArray().length; i++) {
            getSquare(i).addEventListener('click',() => addChoice(getSquare(i)));
        }
    }
    

    function addChoice(sqr)
    {
        let img = sqr.firstElementChild;
        let isGuessed = img.classList.contains("guessed");

        if(choices[0] === undefined && readyToAdd && isGuessed === false)
        {
            add();    
        }
       
        if(choices[0] !== undefined && readyToAdd && choices[0].parentElement != sqr && isGuessed === false){
            add();
        }

        function add() {
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
                for (let i = 0; i < 2; i++) {choices[i].classList.add("guessed");}
                score++;
                choices = [];
                readyToAdd = true;
            }
            else{
                setTimeout(()=>{
                    choices[0].style.display = "none";
                    choices[1].style.display = "none";  
                    choices = [];
                    readyToAdd = true;
                    },750);
            }
            userAttempts++;

            updateGameStatus();
        }
    }
}

function updateGameStatus(){
    scoreText.innerHTML = "0" + score + "/06";
    if (userAttempts < 10) { attemptsText.innerHTML = "0" + userAttempts; }
    else { attemptsText.innerHTML = userAttempts; }
    return;
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
    userAttempts = 0;
    score = 0;
    choices = [];

    updateGameStatus();
    hideAllImages();

    LinkImages();
    GameLogic();
    isFirstTime = false;

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