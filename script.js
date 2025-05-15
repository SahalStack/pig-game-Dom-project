'use strict';

//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let scores, dice, currentScore, activePlayer, playing;

//staring conditions
const reset = function () {
  scores = [0, 0];
  dice = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  current0.textContent = 0;
  current1.textContent = 0;
  player1.classList.remove('player-winner');
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
reset();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice number
    const randomDiceNumber = Math.trunc(Math.random() * 6 + 1);
    console.log(randomDiceNumber);

    //Display dice
    diceEl.src = `dice-${randomDiceNumber}.png`;
    diceEl.classList.remove('hidden');

    //if dicenumber is not equal to 1,
    if (randomDiceNumber !== 1) {
      //add dice to currentScore
      currentScore += randomDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //if dicenumber is equal to 1,
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add curent score to active Players score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if players score
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
