let cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
  ];
  let flippedCards = [];
  let moves = 0;
  let score = 1000; // Starting score
  let timer;
  let seconds = 0;
  let isGameOver = false;
  
  // Shuffle the cards
  function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
  }
  
  // Create the board
  function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    shuffleCards();
    
    cards.forEach((cardValue, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  }
  
  // Flip a card
  function flipCard(event) {
    if (isGameOver || flippedCards.length === 2) return;
    
    const card = event.target;
    if (card.classList.contains('flipped')) return;
    
    card.textContent = cards[card.dataset.index];
    card.classList.add('flipped');
    flippedCards.push(card);
  
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  // Check if the cards match
  function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    
    if (cards[firstCard.dataset.index] === cards[secondCard.dataset.index]) {
      flippedCards = [];
      moves++;
      score -= 10;  // Subtract 10 points for each move
      updateMoves();
      updateScore();
      checkGameOver();
    } else {
      setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
        moves++;
        score -= 10;  // Subtract 10 points for each move
        updateMoves();
        updateScore();
      }, 1000);
    }
  }
  
  // Update move count
  function updateMoves() {
    document.getElementById('moves').textContent = `Moves: ${moves}`;
  }
  
  // Start timer
  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      document.getElementById('timer').textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);
  }
  
  // Reset the game
  function startGame() {
    flippedCards = [];
    moves = 0;
    score = 1000; // Reset score
    seconds = 0;
    isGameOver = false;
    clearInterval(timer);
    createBoard();
    updateMoves();
    updateScore();
    document.getElementById('timer').textContent = 'Time: 00:00';
    startTimer();
  }
  
  // Update score
  function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
  }
  
  // Check if the game is over
  function checkGameOver() {
    const totalCards = document.querySelectorAll('.card').length;
    const flippedCards = document.querySelectorAll('.card.flipped').length;
  
    if (flippedCards === totalCards) {
      clearInterval(timer);
      isGameOver = true;
      // Add a bonus score for finishing the game quickly
      score += Math.max(0, 500 - seconds * 2);  // Bonus points for faster time
      alert(`You won! Moves: ${moves}, Time: ${document.getElementById('timer').textContent}, Final Score: ${score}`);
    }
  }
  
  // Initialize the game
  startGame();
  