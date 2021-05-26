let playField = [];
for(let i = 0; i < 3; i++){
    playField[i] = new Array(3);
}
let currentPlayer = 2; //player X is 1, player O is 2
let Xpoints = 0;
let Opoints = 0;
cleanField();


function claimCell(id){
    let button = document.getElementById(id);
    let [x,y] =id.split(",");

    changePlayer();
    button.classList.add(getPlayerName());
    button.innerText=getPlayerName();
    button.disabled=true;
           
    playField[x][y] = currentPlayer;
            

    if(checkWin(currentPlayer)){
        disableField(true);
        document.getElementById("player").innerText = getPlayerName() + " won the game";
        pointAdd();
    }
}

function getPlayerName(){
    if(currentPlayer ==1){
        return "X";
    }else if(currentPlayer ==2){
        return "O";
    }
    return "error"
}

function changePlayer(){
    document.getElementById("player").innerText=getPlayerName() + " turn";
    if(currentPlayer==1){
        currentPlayer =2;
    }else{
        currentPlayer =1;
    }
}

function disableField(state){ //disable all the buttons
    let buttons = document.getElementsByClassName("button");
            
    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled=state;
    }
}
        
function checkWin(whichPlayer){
    if(diagonal(whichPlayer) || orizzontalOrVertical(whichPlayer)){
        return true;
    }
    return false;
}
    

        
function orizzontalOrVertical(whichPlayer){
    let ret = false;
    for(let i = 0; i < 3; i++){
        if(playField[i][0] == playField[i][1] &&  playField[i][1] == playField[i][2] && playField[i][2] == whichPlayer){
            console.log(whichPlayer + "orizzontal true");
            ret = true;
        }
        if(playField[0][i] == playField[1][i] && playField[1][i] == playField[2][i] && playField[2][i] == whichPlayer){
            console.log(whichPlayer + "vertical true");
            ret = true;
        }
    }
    return ret;
}

function diagonal(whichPlayer){
    let tmp = false;
    if(playField[0][0] == playField[1][1] && playField[1][1] == playField[2][2] && playField[2][2] == whichPlayer){
        tmp = true;
    }
    if(playField[2][0] == playField[1][1] && playField[1][1] == playField[0][2] && playField[0][2] == whichPlayer){
        tmp = true;
    }
    console.log(whichPlayer + "diagonal"+ tmp);
    return tmp;
}

function cleanField(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            playField[i][j] = 0;
        }
    }
}

function cleanButtons(){
    let buttons = document.getElementsByClassName("O");
            
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove("O");
    }

    buttons = document.getElementsByClassName("X");

    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove("X");
    }

    buttons = document.getElementsByClassName("button");

    for(let i = 0; i < buttons.length; i++){
        buttons[i].innerText="";
    }

    if(document.getElementsByClassName("O").length > 0 || document.getElementsByClassName("X").length > 0){ //not the best solution, but it's effective
        cleanButtons();
    }
}

function restart(){
    cleanButtons();
    cleanField();
    changePlayer();
    changePlayer();
    disableField(false);
    displayPoints();
}

function pointAdd(){
    if(currentPlayer == 1){
        Xpoints++;
    }else if(currentPlayer ==2){
        Opoints++;
    }
}

function displayPoints(){
    document.getElementById("pointCounter").innerText="X " + Xpoints +"-"+ Opoints +" O";
}