

let displayController = (function () {
   
    let state = 1

    // cache DOM 
    const domArray = [document.querySelector('.state-1-wrapper'),
                document.querySelector('.state-2-wrapper')]  

                               
    _render(state)

    function getState() {
        console.log(this)
        return state
    }

    function setState(newState) {
        state = newState
        _render(state)
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

    // 0 = playing, 1 = round win, 2 = match win
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

    function playAI() {
        setTimeout(() => {
            if (players[Number(playerTurn)].getAI() == 1) {
                easyAI.makeMove()
            } else {
                // impossibleAI.makeMove()
            }
        }, 1000);
    }

    function updateBoard(AIid) {
        if (!winState) {
            _setBoardState.call(gameBoard, this.id || AIid)
            _render()
            checkWin()
            console.log(players[Number(playerTurn)], playerTurn);
            if (players[Number(playerTurn)].getAI() > 0) {
                console.log('trigg');
                playAI()
            }
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
                winRound(check, [i, i + 3, i + 6])
                return
            }
        }
        for (let i = 0; i < 7; i = i + 3) {
            let check = boardState[i] + boardState[i + 1] + boardState[i + 2]
            if (check == 'XXX' || check == 'OOO') {
                winRound(check, [i, i + 1, i + 2])
                return
            }
        }
        let diagonal1 = boardState[0] + boardState[4] + boardState[8]
        let diagonal2 = boardState[2] + boardState[4] + boardState[6]
        if (diagonal1 == 'XXX' || diagonal1 == 'OOO') {
            winRound(diagonal1, [0, 4, 8])
            return
        }
        if (diagonal2 == 'XXX' || diagonal2 == 'OOO') {
            winRound(diagonal2, [2, 4, 6])
            return
        }
        for (let i = 0; i < boardState.length; i++) {
            if (!boardState[i]) {
                return
            }           
        }
        winRound('TIE',[])
    }

    function winRound(winner, matchingFields) {
        matchingFields.forEach(element => {
            fields[element].style.backgroundColor = 'green'
        });
        winState = 1
        if (winner == 'XXX') {
            Player1.updateScore()            
        } else if (winner == 'OOO') {
            Player2.updateScore()
        }

        if (Player1.getScore() == 5 || Player2.getScore() == 5) {
            const matchWinner = Player1.getScore() == 5 ? 'Player 1' : 'Player 2'
            resultBox.textContent = `${matchWinner} wins the round. Rematch?`
            winState = 2
        }

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
        resultBox.textContent = 'Next Round'
        if (winState == 2) {
            resetScore()
        }
        winState = 0
        playAI()
    }

    function resetScore() {
        scoreboard.forEach(element => {
            element.textContent = 'Score: 0'
        })
        Player1.reset()
        Player2.reset()
    }

    const easyAI = (function () {

        function evaluate() {
            let emptyFields = []
            let boardState = gameBoard.getBoardState()
            for (let i = 0; i < boardState.length; i++) {
                if (!boardState[i]) {
                    emptyFields.push(i)
                }
            }
            return emptyFields
        }

        function makeMove() {
            const emptyFields = evaluate()
            const randomSpot = emptyFields[Math.floor(Math.random() * emptyFields.length)]
            updateBoard(randomSpot)
        }

        return { makeMove, evaluate }

    })()
    

    return { getBoardState, easyAI, playAI }
})()


const Player = () => {
    let score = 0

    // 0 = human, 1 = easy, 2 = impossible
    let isAI = 0

    const updateScore = () => {
        score++
    }

    const getScore = () => {
        return score
    }

    const getAI = () => {
        return isAI
    }

    const setAI = (newSetting) => {
        isAI = newSetting
    }

    const reset = () => {
        score = 0
    }

    return { updateScore, getScore, getAI, setAI, reset}
}

const Player1 = Player();
const Player2 = Player();
const players = [Player2, Player1]
