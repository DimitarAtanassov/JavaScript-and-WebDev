//P1 object literal
const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
//P2 object literal
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}
//Selects some inputs
const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 3; //Keeps track of the score players are playing to
let isGameOver = false; //Boolean to keep track if a player wins
//                     p1/p2   p1/p2 depending on how the function is called
function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            //When ever that game is over one side of the score will be red the other side of the score will be green
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            //When there is a winner the player buttons will be disabled so the scores can not keep on changing
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

//P1 score button
p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})
//player2 score button
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})

//Sets the winning score var (sets what the players are playing too whem they use the drop down menu)
winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    //Resets both the player scores and display text
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        //Removes the red and green color on the text because the game is reset
        p.display.classList.remove('has-text-success', 'has-text-danger');
        //When a player wins the buttons get disabled however when they press reset both buttons will now be enabled again
        p.button.disabled = false;
    }
}
