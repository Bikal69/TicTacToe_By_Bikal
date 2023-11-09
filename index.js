const xClass='x';
const circleClass='circle';
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const winningMessageElement=document.getElementById("winningMessage");
const winningMessageText=document.querySelector('[data-winning-message-text]');
const restart=document.getElementById("restartButton");
const winningCombination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [0,3,6],
    [2,5,8]
]
const bounceSound=new Audio('sounds/alive.mp3')
const ded=new Audio('ded.wav');
const gameRunning=new Audio('game_running.wav')
const won=new Audio('sounds/won.mp3')
let cicrleTurn
startGame();
restart.addEventListener("click",startGame)
function startGame(){
    gameRunning.play()
    gameRunning.volume=0.2;
    gameRunning.loop=true;
    ded.pause();
    ded.currentTime=0;
    won.pause();
    won.currentTime=0;
    cicrleTurn=false;
cellElements.forEach((cell)=>{
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.addEventListener('click',handleClick,{once:true})
});
setBoardHoverClass()
winningMessageElement.classList.remove("show");
}
function handleClick(e){
    if (!bounceSound.paused) {
        // If the previous audio is still playing, stop it and play the new audio
        bounceSound.pause();
        bounceSound.currentTime = 0; // Reset the audio to the beginning
      }
      
      bounceSound.play(); // Play the new audio
   const cell=e.target;
   const currentClass=cicrleTurn?circleClass:xClass;
   placeMark(cell,currentClass)
   if(checkWin(currentClass)){
    won.play();
    gameRunning.pause()
    gameRunning.currentTime=0;
   
endGame(false);
   }else if(isDraw()){
    gameRunning.pause()
    gameRunning.currentTime=0;
ded.play()
    endGame(true);
   }else{
   swapTurns()
   setBoardHoverClass()
}
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    cicrleTurn=!cicrleTurn
}
function setBoardHoverClass(){
board.classList.remove(xClass)
board.classList.remove(circleClass)
if(cicrleTurn){
board.classList.add(circleClass)
}
else{
board.classList.add(xClass)
}
}
function checkWin(currentClass){
    return winningCombination.some(combination=>{
    return combination.every((index)=>{
        return cellElements[index].classList.contains(currentClass)
    })
})
}
function endGame(draw){
bounceSound.pause()
if(draw){
winningMessageText.innerText='Draw!'
}else {
        winningMessageText.innerText=`${cicrleTurn?"0's":"x's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}
function isDraw(){
    return [...cellElements].every(ele=>{
        return ele.classList.contains(xClass)||ele.classList.contains(circleClass)
    })
}