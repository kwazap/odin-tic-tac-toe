

let displayController = (function () {
   
    let state = 1

    // cache DOM 
    domArray = [document.querySelector('.state-1-wrapper'),
                document.querySelector('.state-2-wrapper')]   
                               
    _render(state)

    function getState() {
        console.log(this);
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

    // player turn flip-flop
    let playerTurn = true

    // DOM cache
    let fields = document.querySelectorAll('.field')

    //innit
    fields.forEach(element => {
        element.addEventListener('click', updateBoard)
    })

    function updateBoard() {
        console.log(this);
        _setBoardState.call(gameBoard, this.id)
        _render()
        checkWin()
    }

    function _render() {
        for (let i = 0; i < 9; i++) {
            fields[i].textContent = boardState[i];            
        }
    }

    function getBoardState() {
        return boardState
    }

    function _setBoardState(id) {
        if (!boardState[id]) {
            boardState[id] = (playerTurn ? 'X' : 'O')
        }
        playerTurn = !playerTurn
    }

    function checkWin() {
        console.log('checking', boardState);
        for (let i = 0; i < 3; i++) {
            let check = boardState[i] + boardState[i + 3] + boardState[i + 6]
            if (check == 'XXX' || check == 'OOO') {
                winRound(check)
            }
        }
        for (let i = 0; i < 7; i = i + 3) {
            let check = boardState[i] + boardState[i + 1] + boardState[i + 2]
            if (check == 'XXX' || check == 'OOO') {
                winRound(check)
            }
        }
        let diagonal1 = boardState[0] + boardState[4] + boardState[8]
        let diagonal2 = boardState[2] + boardState[4] + boardState[6]
        if (diagonal1 == 'XXX' || diagonal1 == 'OOO') {
            winRound(diagonal1)
        }
        if (diagonal2 == 'XXX' || diagonal2 == 'OOO') {
            winRound(diagonal2)
        }
    }

    function winRound(winner) {
        if (winner == 'XXX') {
            Player1.updateScore()
        } else {
            Player2.updateScore()
        }
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

    return {updateScore, getScore}
}

const Player1 = Player();
const Player2 = Player();