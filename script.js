

let displayController = (function () {
   
    let state = 1

    // cache DOM 
    domArray = [document.querySelector('.state-1-wrapper'),
                document.querySelector('.state-2-wrapper')]  

                               
    _render(state)

    function getState() {
        return state
    }

    function setState(newState) {
        this.state = newState
        _render(this.state)
    }

    function _render(state) {
        domArray.forEach(element => {
            element.style.display = 'none'
        })
        domArray[state].style.display = 'grid'
    }

    return { getState, setState }

})()

let gameBoard = (function () {

    let boardState = Array(9)
    let winState = 0

    // player turn flip-flop
    let playerTurn = true

    // DOM cache
    let fields = document.querySelectorAll('.field')
    const scoreboard = document.querySelectorAll('.scoreboard')
    const resultBox = document.querySelector('.result-wrapper')

    //innit
    resultBox.addEventListener('click',resetBoard)
    fields.forEach(element => {
        element.addEventListener('click', updateBoard)
    })

    function updateBoard() {
        if (!winState) {
            _setBoardState.call(gameBoard, this.id)
            _render()
            checkWin()
        }
        
    }

    function _render() {
        for (let i = 0; i < 9; i++) {
            fields[i].textContent = boardState[i];            
        }
        scoreboard[0].textContent = `Score: ${Player1.getScore()}`
        scoreboard[1].textContent = `Score: ${Player2.getScore()}`
    }

    function getBoardState() {
        return boardState
    }

    function _setBoardState(id) {
        if (!boardState[id]) {
            boardState[id] = (playerTurn ? 'X' : 'O')
            playerTurn = !playerTurn
        }
    }

    function checkWin() {
        for (let i = 0; i < 3; i++) {
            let check = boardState[i] + boardState[i + 3] + boardState[i + 6]
            if (check == 'XXX' || check == 'OOO') {
                winRound(check, [i, i+3, i+6])
            }
        }
        for (let i = 0; i < 7; i = i + 3) {
            let check = boardState[i] + boardState[i + 1] + boardState[i + 2]
            if (check == 'XXX' || check == 'OOO') {
                winRound(check, [i, i+1, i+2])
            }
        }
        let diagonal1 = boardState[0] + boardState[4] + boardState[8]
        let diagonal2 = boardState[2] + boardState[4] + boardState[6]
        if (diagonal1 == 'XXX' || diagonal1 == 'OOO') {
            winRound(diagonal1, [0, 4, 8])
        }
        if (diagonal2 == 'XXX' || diagonal2 == 'OOO') {
            winRound(diagonal2, [2, 4, 6])
        }
    }

    function winRound(winner, matchingFields) {
        matchingFields.forEach(element => {
            fields[element].style.backgroundColor = 'green'
        });
        winState = 1
        winner == 'XXX' ? Player1.updateScore() : Player2.updateScore()
        _render()
        resultBox.style.display = 'grid'
    }

    function resetBoard() {
        fields.forEach(element => {
            element.style.backgroundColor = 'white'
        })
        boardState = Array(9)
        _render()
        resultBox.style.display = 'none'
        winState = 0
    }
    

    return { getBoardState }
})()


const Player = () => {
    let score = 0

    const updateScore = () => {
        score++
    }

    const getScore = () => {
        return score
    }

    return { updateScore, getScore }
}

const Player1 = Player();
const Player2 = Player();