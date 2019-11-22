import React from 'react';

class Counter extends React.Component {

    initialState = {
        score: 0, 
        incrementAmount: 1
    }

    constructor() {
        super()
        this.state = this.initialState
    }

    render() {
        const { score, incrementAmount } = this.state

        return (
            <div>
                <h1>Current Score: {score}</h1>
                <button 
                    hidden={score >= 100}
                    onClick={this.handleIncrementScore}
                >
                +{incrementAmount}
                </button>
                
                <br/>
                <br/>
                
                <button 
                    hidden={score >= 100}
                    onClick={this.handleBuyImprovedIncrementAmount}
                >
                Pay 10 points to change from +{incrementAmount} to +{incrementAmount + 1}
                </button>
                <h1 hidden={score < 100}>You Win!</h1>
                <button
                    hidden={score < 100}
                    onClick={this.handlePlayAgain}
                >
                Play again
                </button>
            </div>
        );
    }

    handleIncrementScore = () => {
        this.setState({ score: this.state.score + this.state.incrementAmount })
    }

    handleBuyImprovedIncrementAmount = () => {

        if (this.state.score >= 10) {
            this.setState({ 
                score: this.state.score - 10,
                incrementAmount: this.state.incrementAmount + 1 
            })    
        } else {
            alert("You can't afford that!")
        }
    }

    handlePlayAgain = () => {
        this.setState(this.initialState)
    }
}

export default Counter;