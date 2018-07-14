/*
 * Create a list that holds all of your cards
 */

let toggledCards = [];
const deck = document.querySelector('.deck'); //create variable deck, define as element with class deck
console.log('deck'); //print word deck, type word deck will show children elements of deck

deck.addEventListener('click', event => { //add event listener to deck instead of individual cards to improve performance.
  //Clicking on the element degines it as the target
  const clickTarget = event.target; //create variable clickTarget and assign target event to it
  if(clickTarget.classList.contains('card')&& //parameter search for any elements in deck with a class of card
  toggledCards.length < 2){ //and a second parameter that there are less than 2 cards in the toggledCards array then
    //toggleCards and addToggleCard functions can fire
   toggleCard(clickTarget); //calls the function toggleCard and applies it to the parameter clickTarget
   addToggleCard(clickTarget);//calls function to add toggled cards to array.

   if (toggledCards.length === 2){ //if statement to check if the length of the toggledCards array is equal to 2 cards.
     console.log("That's two cards"); // print message if the toggledCards array is equal to 2
     checkForMatch();//Call function that checks for matched cards
   }
}
});

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
  console.log(toggledCards);  //print toggeled cards aray to console.
}

function checkForMatch(){ //function to checking if the cards in the toggledCards array are a match
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
    toggledCards =[];
  } else {
    console.log('Not a match!');
       setTimeout(() => {
           toggleCard(toggledCards[0]);// if there is no match between the first and second items in the array, we call the function
                                 //toggleCard with a parameter of first item in the toggledCards array. This will toggle the first
                                 //card's classses of 'open' amd 'show' to removed
           toggleCard(toggledCards[1]);// if there is no match between the first and second items in the array, we call the function
                                 //toggleCard with a parameter of second item in the toggledCards array. This will toggle the second
                                 //card's classses of 'open' amd 'show' to removed
           toggledCards = []; //clears the toggledCard array so it can be used again for the next two card selections
  }, 1000); // pauses the execution of code for 1000ms so that the unmatched second card can be seen before the array is reset.
  }
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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
