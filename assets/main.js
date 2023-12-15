document.addEventListener('DOMContentLoaded', () => {
  const chessboard = document.getElementById('chessboard')
  const checkButton = document.getElementById('checkbutton')
  const resultElement = document.getElementById('result')
  let selectedQueens = []

  function canQueensAttack (queen1, queen2) {
    const [x1, y1] = queen1
    const [x2, y2] = queen2

    return (
      x1 === x2 ||
      y1 === y2 ||
      Math.abs(x1 - x2) === Math.abs(y1 - y2)
    )
  }

  function renderChessboard () {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const button = document.createElement('button')
        button.className = 'square'
        button.classList.add((row + col) % 2 === 0 ? 'white' : 'black')
        button.addEventListener('click', () => {
          handleButtonClick(button, row, col)
        })

        chessboard.appendChild(button)
      }
    }
  }

  function handleButtonClick (button, row, col) {
    if (selectedQueens.length < 2) {
      selectedQueens.push([row, col])
      button.classList.add('queen', 'selected')
      button.innerHTML = '&#9813;' // Unicode for chess queen
    } else {
      const prevSelectedButtons = document.querySelectorAll('.selected')
      prevSelectedButtons.forEach(btn => {
        btn.classList.remove('selected')
        btn.innerHTML = '' // Clear the queen icon
      })

      selectedQueens = [[row, col]]
      button.classList.add('queen', 'selected')
      button.innerHTML = '&#9813;'
    }
  }

  function checkQueens () {
    if (selectedQueens.length === 2) {
      const [queen1, queen2] = selectedQueens
      const result = canQueensAttack(queen1, queen2)
      resultElement.textContent = result ? 'Queens can attack each other!' : 'Queens cannot attack each other.'
    } else {
      resultElement.textContent = 'Please select two queens before checking.'
    }
  }

  renderChessboard()
  checkButton.addEventListener('click', checkQueens)
})
