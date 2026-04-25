const gameContainer = document.querySelector(".game_container");
const shuffleBtn = document.querySelector("#shuffle");
const resetBtn = document.querySelector("#reset");
const timerDisplay = document.querySelector("#timer");
const recordDisplay = document.querySelector("#record");

let board = [];
let moves = 0;
let bestRecord = localStorage.getItem("record") || 0;

let seconds = 0;
let timer;
let started = false;

recordDisplay.textContent = bestRecord;

const size = 4;

// Estado resolvido
function createBoard(){
    board = [
        1,2,3,4,
        5,6,7,8,
        9,10,11,12,
        13,14,15,null
    ];

    renderBoard();
}

function renderBoard(){
    gameContainer.innerHTML = "";

    board.forEach((number,index)=>{
        const tile = document.createElement("div");

        tile.classList.add("tile");

        if(number === null){
            tile.classList.add("empty");
        }else{
            tile.textContent = number;
            tile.addEventListener("click",()=>moveTile(index));
        }

        gameContainer.appendChild(tile);
    });
}

function moveTile(index){

    if(!started){
        startTimer();
        started=true;
    }

    const emptyIndex = board.indexOf(null);

    if(validMove(index, emptyIndex)){
        [board[index], board[emptyIndex]] =
        [board[emptyIndex], board[index]];

        moves++;
        renderBoard();

        if(checkWin()){
            clearInterval(timer);

            if(!bestRecord || moves < bestRecord){
                bestRecord = moves;
                localStorage.setItem("record",moves);
                recordDisplay.textContent = moves;
            }

            setTimeout(()=>{
                alert(`Você venceu em ${moves} movimentos!`);
            },200);
        }
    }
}

function validMove(index, empty){

const row = Math.floor(index/size);
const col = index % size;

const emptyRow = Math.floor(empty/size);
const emptyCol = empty % size;

return (
Math.abs(row-emptyRow)+
Math.abs(col-emptyCol)
===1
);
}

function shuffleBoard(){

for(let i=0;i<500;i++){

let empty = board.indexOf(null);
let possible = [];

const up = empty-size;
const down = empty+size;
const left = empty-1;
const right = empty+1;

if(up>=0) possible.push(up);
if(down<16) possible.push(down);
if(empty%4!==0) possible.push(left);
if(empty%4!==3) possible.push(right);

let randomMove =
possible[Math.floor(Math.random()*possible.length)];

[board[empty],board[randomMove]]=
[board[randomMove],board[empty]];
}

moves=0;
resetTimer();
renderBoard();
}

function checkWin(){

for(let i=0;i<15;i++){
if(board[i]!==i+1){
return false;
}
}

return true;
}

function startTimer(){

timer = setInterval(()=>{
seconds++;

let min =
String(Math.floor(seconds/60)).padStart(2,"0");

let sec =
String(seconds%60).padStart(2,"0");

timerDisplay.textContent=`${min}:${sec}`;

},1000);

}

function resetTimer(){
clearInterval(timer);
seconds=0;
started=false;
timerDisplay.textContent="00:00";
}

shuffleBtn.addEventListener("click",shuffleBoard);

resetBtn.addEventListener("click",()=>{
createBoard();
moves=0;
resetTimer();
});

createBoard();