

let displayController = (function () {
   
    this.state = 0;

    // cache DOM 
    domArray = [document.querySelector('.state-1-wrapper'),
                document.querySelector('.state-2-wrapper')]   
                               
    _render(state)

    function getState() {
        return this.state
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

    return {getState, setState}
    
})()