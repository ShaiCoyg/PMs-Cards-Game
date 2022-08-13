const cards = document.querySelectorAll('.memory-card'); //Go into the array of all tabs
const namesList = document.querySelectorAll('.text');
const button = document.getElementsByClassName('reset');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) { //First click on the card
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
    //check the attribute framework is equal to each other.
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    //Removes the event listener from the tabs
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  namesList.forEach(nameInList => {
    let nameMatch = firstCard.dataset.framework === nameInList.dataset.framework;
    if (nameMatch == true) {
      nameInList.style.display = "grid";
    }
  },);
  counter = counter + 1;
  document.getElementById("score").innerHTML = counter;
  if (counter == 9) {
    document.getElementById("score").style.border = "0.125em solid #0000FF";

  }

    resetBoard();//reset the variables for the next clicks.
}

function unflipCards() {
  lockBoard = true;
    //By removing the 'flip' tag, the css it will be back to the way it was before the click.
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
 
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
function resetTheGame() {
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.removeEventListener('click', flipCard));
    resetBoard();
    cards.forEach(card => card.addEventListener('click', flipCard));
    namesList.forEach(nameInList => {
        nameInList.style.display = "none";
    },);
    counter = 0;
    document.getElementById("score").innerHTML = 0;
    document.getElementById("score").style.border = "";
}

cards.forEach(card => card.addEventListener('click', flipCard));
button[0].addEventListener('click', resetTheGame);