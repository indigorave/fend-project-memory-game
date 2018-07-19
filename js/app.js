/*
Global Variables
 */
let moves = 0; //set the variable tracking the number of moves to 0
let toggledCards = []; //create an array to hold the 2 cards clicked during game play
let timerOff = true; //make sure the timer has not started or turn off the timer
let time = 0; //the initial value of time
let clockId; //
let matched = 0; //initial value of the number of matched pairs
const pairs = 1; //number of matched paris that will trigger the gameOver function
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


const deck = document.querySelector('.deck'); //create variable deck, define as element with class deck

startGame(); //start game when page is loaded



//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array){
let currentIndex = cards.length, temporaryValue, randomIndex; //array.length
    while (0 !== currentIndex) {//While the current index is not equal to 0
        randomIndex = Math.floor(Math.random() * currentIndex); //
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
     return array;
   }
shuffle(cards);

function startGame() { //events needed to start game
for(let i = 0; i < cards.length; i++) { //loop through number of items in the array
        const card = document.createElement("li"); //create an elelment of list item for each item in the array
        card.classList.add("card"); //add a class of card for each item in the array
        card.innerHTML = "<i class='"+ cards[i] + "'></i>"; //add an element of i with a class of the fa icon listed in the array
        deck.appendChild(card); //append list item, classes and i elements for each item in the array
}
}

deck.addEventListener('click', event => { //add event listener to deck instead of individual cards to improve performance.
  //Clicking on the element degines it as the target
  const clickTarget = event.target; //create variable clickTarget and assign target event to it
  if (isClickValid(clickTarget)) { //call isClickValid function for clickTarget
    if (timerOff === true) { //validate if the timerOff value is true on click
      startTimer(); //if on click the timerOff value is true, call the startTimer function
      timerOff = false; //if the timerOff value is true, set the timerOff value to false so it is not called again
      }
  }
   if(clickTarget.classList.contains('card')&& //parameter search for any elements in deck with a class of card
  toggledCards.length < 2){ //and a second parameter that there are less than 2 cards in the toggledCards array then
    //toggleCards and addToggleCard functions can fire
   toggleCard(clickTarget); //calls the function toggleCard and applies it to the parameter clickTarget
   addToggleCard(clickTarget);//calls function to add toggled cards to array.
   addMove(); // calls addMove function to increment by one for every 1 clicks


 if (toggledCards.length === 2){ //if statement to check if the length of the toggledCards array is equal to 2 cards.
    // console.log("That's two cards"); // print message if the toggledCards array is equal to 2
     match();//Call function that checks for matched cards
     checkScore(); // call the checkScore function if the number of cards in the toggledCards array is equal to 2

if (matched === pairs) { //validate if the number of matched pairs is equal to the constant total pairs
   gameOver(); // if matched equals total pairs, call the function gameOver
   console.log("game over");
}
}
}
}
);


document.querySelector('.restart').addEventListener('click',resetGame); //add event listener
                                                                        //to check if the user has clicked the resetGame game
                                                                        //button and call the resetGame functions
                                                                        //if the button has been clicked
document.querySelector('.modal_replay').addEventListener('click',replayGame); //add event listeners
                                                                              //to check if the user has clicked the replay game
                                                                             //button on the gameOver modal and call the replayGame functions
                                                                             //if the button has been clicked

document.querySelector('.modal_close').addEventListener('click',toggleModalBackground);

/*Functions*/

function isClickValid(clickTarget) { //create the function isClickValid with a parameter of clickTarget
  return (// return is supposed to stop the execution of the script.  Why this belongs here I'm not sure
    clickTarget.classList.contains('card')&&//search the target to determine if the target of the event hass a class of card
    !clickTarget.classList.contains('match') &&//and does not have a class of match
    toggledCards.length < 2 &&//and the toggledCards array is less than 2
    !toggledCards.includes(clickTarget)//and the array does not include the card already clicked in the current move set
  )
  ;
}
function toggleCard(clickTarget) { //By turning this in to a function, the clicl event/target is part of the function parameter
  clickTarget.classList.toggle('open') ; //adds the class 'open' because it isn't there.
                            //click on the card again it will remove the class 'open'
  clickTarget.classList.toggle('show') ; //add the class 'show' because it isn't there.
                            //click on the card again it will remove the class 'show'
}


function addToggleCard(clickTarget){ //create a function to add the toggled cards
                                    //(identified by they fact that they object of the clickTarget) to an array
  toggledCards.push(clickTarget); //any card that is clicked on will be added to the toggledCards array.
                                  //it is possible to add event listeners to arrays but not to nodeLists
  console.log(toggledCards);  //print toggeled cards array to console.
}

function match(){ //function to checking if the cards in the toggledCards array are a match
  if ( //if statement comparing the className or the firstElementChild of the first position of the the toggledCards arrays
       //with the classname of the firstElementChild of the second position of the toggledCards array
    toggledCards[0].firstElementChild.className === //using the console, you can see that the firstElementChild contains the
                                                    //class name we are trying to compare for each element in the array
    toggledCards[1].firstElementChild.className
  )
  {
    toggledCards[0].classList.toggle('match'); // if there is a match between the first and second items in the array, we toggle
                                              //the first card's class to 'match', since there isn't already an existing 'match' class,
                                              //its added to the element
    toggledCards[1].classList.toggle('match')// if there is a match between the first and second items in the array, we toggle
                                              //the second card's class to 'match', since there isn't already an existing 'match' class,
                                              //its added to the element
    toggledCards =[]; //resetting the array of toggledCards to empty
    matched++;
  } else {  // else statement in the first conditions are not met
           setTimeout(() => { //arrow function ES6 prevents you from having to type of function or return
           toggleCard(toggledCards[0]);// if there is no match between the first and second items in the array, we call the function
                                 //toggleCard with a parameter of first item in the toggledCards array. This will toggle the first
                                 //card's classses of 'open' amd 'show' to removed
           toggleCard(toggledCards[1]);// if there is no match between the first and second items in the array, we call the function
                                 //toggleCard with a parameter of second item in the toggledCards array. This will toggle the second
                                 //card's classses of 'open' amd 'show' to removed
           toggledCards = []; //clears the toggledCard array so it can be used again for the next two card selections
  }, 1000); // pauses the execution of code for 500ms so that the unmatched second card can be seen before the array is reset.
  }
}

function addMove() {//function that increments the value of the moves text on the scoreboard by one
  moves++; //incrememnt the number of moves
  const movesText = document.querySelector('.moves'); //initiates a variable of for movesText
                                                      //and populates it with the moves varaible value
  movesText.innerHTML = moves; //update the HTML on the scoreboard with the value of the moves variable
}


function checkScore() { //function that checks how many moves have been made
  if (moves === 2 || moves === 5 || moves === 7 // the first === sets the number of moves that is reached to call the
                                                //hideStar function.  The second === triggers the next time the hideStar
                                                //hideStar function is called.
  ){ removeStar();//calls the hideStar function on the 2, 5 and 7th move
    }
}

function removeStar() { //functionality for hiding stars
const starListItems = document.querySelectorAll('.stars li'); //create starList variable and select all list items
                                                         // with a class of stars
  for (star of starListItems){//searches for the fa fa-star class on the i element
    if (star.style.display !=='none') { //if the display does not equal none
      star.style.display = 'none'; //it changes the style to none, which hides the star
      break //then it exits out of the codeblock
    }
  }
}

function startTimer(){ // create the startTimer function
   clockId = setInterval(() => { //assign the clockId variable with the setInterval method
    time++; // incremet time by a second
    displayTime(); //call the displayTime function
    console.log(time);//write to the console the number of seconds that have passed
  }, 1000);
}

function displayTime() { //create the displayTme function
  const clock = document.querySelector('.clock'); //create the variable clock and define it as the
                                                  //first element returned with a select of clock
  console.log(clock); // write the value of clock to the console
  clock.innerHTML = time +" seconds"; //update the HTML of the clock with the value of the time variable
                                      //concatenated with " seconds"
}

function stopTimer() { //create stopTimer function
  clearInterval(clockId); //clears the time(intervals) set by the startTimer function
}

function toggleModalBackground() { //creates the function to hide or display the modal background
  const modal_background = document.querySelector('.modal_background'); //sets the const modal to the first element with
                                                                        //the selector(class) modal_background
  modal_background.classList.toggle('hide'); //adds or removes the word hide from the modal_background
}

function toggleModalBody() //create the function to fide or display the modal body
{
  const modal_body = document.querySelector('.modal_body'); //sets the const modal to an
  modal_body.classList.toggle('hide');//add or removes the word hide from the modal_body
}

function writeModalStats(){ //create function for Modal Stats
  const timeStat = document.querySelector('.modal_time'); //define variable for time at end of Game
  const clockTime = document.querySelector('.clock').innerHTML; //define variable for element with clock class innerHTML
  const movesStat = document.querySelector('.modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  const stars = getStars();
  timeStat.innerHTML = time + " seconds";  //
  movesStat.innerHTML =  moves + " moves"; //track and print number of moves
  starsStat.innerHTML = stars + " stars"; //track and print number of stars
}

document.querySelector('.modal_cancel').addEventListener('click', () => {//add an event listener to the cancel icon on the modal window
  toggleModalBody(); //call the toggle
  toggleModalBackground();
});

document.querySelector('.modal_replay').addEventListener('click',()=> {//add ab event listener to the replay icon on the modal window
  console.log('replay');//print replay  TODO: Create a function for replay
});


function gameOver(){  //create function GameOver
  stopTimer(); //calls stopTimer function
  writeModalStats();// calls create modal window and add game stats to modal window
  toggleModalBody(); // calls toggleModal function
  toggleModalBackground();
  resetCards();
}

function resetGame() { //create function to resetGame
  stopTimer();//call stopTimer function
  timerOff = true; //set the global variable of timerOff to true
  time = 0; //set the global variable of time to 0
  displayTime(); //call the displayTme function
  moves = 0; //set the global variable of moves to 0
  document.querySelector('.moves').innerHTML = moves;//populate the moves variable
  stars = 3;
  const starList = document.querySelectorAll('.stars li'); // creates the variable starList
                                                          //and populates it with the elements
                                                          //that are list items with a class
                                                          //of stars
  for (star of starList) {//for each element in the variable staList, update the style display to inline
    star.style.display = 'inline';
  resetCards();

  }
}

function replayGame() {//create function replayGame
  resetGame();//call resetGame function
  toggleModalBody();//call toggle module function
  toggleModalBackground();
}

function resetCards() {//create resetCards function
  matched = 0;
  const cards = document.querySelectorAll('.deck li');//variable cards and populate with
                                                      //all list elements with a class of
                                                      //deck??
  for (let card of cards) {  //create for loop to update card class to card
    card.className = 'card';
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
