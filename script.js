

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
    

    return { getBoardState }
})()