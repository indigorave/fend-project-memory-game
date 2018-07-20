/*
Global Variables
 */
let moves = 0; //set the variable tracking the number of moves to 0
let selectedCards = []; //create an array to hold the 2 cards clicked during game play
let timerOff = true; //make sure the timer has not started or turn off the timer
let time = 0; //the initial value of time
let clockId; //
let matches = 0; //initial value of the number of matches pairs
const pairs = 8; //number of matches paris that will trigger the gameOver function
let cards = ["fa fa-diamond", //Assign icon values to cards array
               "fa fa-paper-plane-o",
               "fa fa-anchor",
               "fa fa-bolt",
               "fa fa-cube",
               "fa fa-leaf",
               "fa fa-bicycle",
               "fa fa-bomb",
               "fa fa-diamond",
               "fa fa-paper-plane-o",
               "fa fa-anchor",
               "fa fa-bolt",
               "fa fa-cube",
               "fa fa-leaf",
               "fa fa-bicycle",
               "fa fa-bomb"];


//Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(cards){
    let currentIndex = cards.length, temporaryValue, randomIndex; //array.length
      while (0 !== currentIndex) {//While the current index is not equal to 0
        randomIndex = Math.floor(Math.random() * currentIndex); //
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
       }
    return cards;
  }
shuffle(cards);

const deck = document.querySelector('.deck'); //create variable deck, define as element with class deck

startGame();
//add event listener to first card click to start timer
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    if (timerOff === true) {
      startTimer();
      timerOff = false;
      }
  }

//Checking to see if the card beeing clicked has already been flipped over
//and if the number of cards that are currently flipped over is less thean 2
//It is also calling the add move function
  if(clickTarget.classList.contains('card')&&
    selectedCards.length < 2){
    selectCard(clickTarget);
    addSelectCard(clickTarget);
    addMove();
  if (selectedCards.length === 2){//if the number of cards clicked is equal to 2, call the match and checkMoves functions
    match();
    checkMoves();
  if (matches ===  pairs) {//if the number of matches equals the number of pairs, call the gameOver function
    gameOver();
    }
   }
  }
}
);


//add Event listener for game restart, game replay and cancel
document.querySelector('.restart').addEventListener('click',resetGame);
document.querySelector('.modal_replay').addEventListener('click',replayGame);
document.querySelector('.modal_close').addEventListener('click',toggleModalBackground);

/*Functions*/

function startGame() {
  for(let i = 0; i < cards.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class='"+ cards[i] + "'></i>";
    deck.appendChild(card);
 }
}

//stops the player from selecting already matched cards, the same card or more than two cards for matching
function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card')&&
    !clickTarget.classList.contains('match') &&
    selectedCards.length < 2 &&
    !selectedCards.includes(clickTarget)
  );
}

function selectCard(clickTarget) {
  clickTarget.classList.toggle('open') ;
  clickTarget.classList.toggle('show') ;
}


function addSelectCard(clickTarget){
  selectedCards.push(clickTarget);
}

//compare cards in the selected cards array to determine if they are matched
function match(){
  if (
    selectedCards[0].firstElementChild.className ===  selectedCards[1].firstElementChild.className
  )
  {
    selectedCards[0].classList.toggle('match');
    selectedCards[1].classList.toggle('match');
    selectedCards =[];
    matches++;
  }
  else {
    setTimeout(() => {
    selectCard(selectedCards[0]);
    selectCard(selectedCards[1]);
    selectedCards = [];
   }, 500);
  }
}

//update number of moves
function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

//check number of moves and remove star
function checkMoves() {
  if (moves === 10 || moves === 20 || moves === 30
  ){ removeStar();
  }
}

function removeStar() {
const starListItems = document.querySelectorAll('.stars li');
  for (star of starListItems){
    if (star.style.display !=='none') {
      star.style.display = 'none';
      break
    }
  }
}

function startTimer(){
   clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function displayTime() {
  const clock = document.querySelector('.clock');
  clock.innerHTML = time +" seconds";
}

function stopTimer() {
  clearInterval(clockId);
}

function toggleModalBackground() {
    const modal_background = document.querySelector('.modal_background');
  modal_background.classList.toggle('hide');
}

function toggleModalBody(){
  const modal_body = document.querySelector('.modal_body');
  modal_body.classList.toggle('hide');
}

function writeModalStats(){
  const timeElapsed = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const numMoves = document.querySelector('.modal_moves');
  const numStars = document.querySelector('.modal_stars');
  const stars = getStars();
  timeElapsed.innerHTML = "Time: " + time + " seconds";
  numMoves.innerHTML =  "Moves: " + moves + " moves";
  numStars.innerHTML = "Stars: " + stars + " stars";
}

document.querySelector('.modal_replay').addEventListener('click',()=> {
  console.log('replay');
});


function gameOver(){
  stopTimer();
  writeModalStats();
  toggleModalBody();
  toggleModalBackground();
  resetCards();
}

function resetGame() {
  stopTimer();
  timerOff = true;
  time = 0;
  displayTime();
  moves = 0;
  matches = 0;
  document.querySelector('.moves').innerHTML = moves;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
    }
  resetCards();
  shuffle(cards);
}

function replayGame() {
  resetGame();
  toggleModalBody();
  toggleModalBackground();
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card'
  }
}


function getStars(){
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none'){
      starCount++
    }
  }
console.log(starCount);
return starCount;
 }
