import React from 'react'
import Board from './board'
import './css/game.css'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) return

        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        const moves = history.map((step, move) => {
            return (
                <button className="btn btn-primary" onClick={() => this.jumpTo(move)} key={move}>
                    {move ?
                        `Go to move #${move}` :
                        'Go to game start'}
                </button>
            )
        })

        return (
            <div className="centered">
                <h1 className="game-title">TicTacToe</h1>
                <h2 className="game-status">{winner ? (
                    <>
                        <span className="winner">Winner: {winner}</span>
                        <br />
                        <span className="loser">Loser: {winner === "X" ? "O" : "X"}</span>
                    </>
                ) : (
                        <span>Next player: {this.state.xIsNext ? 'X' : 'O'}</span>
                    )}</h2>
                <div className="game">
                    <div className={"game-board" + (winner ? " winner" : '')}>
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <h3>History</h3>
                    <div className="game-info">
                        <div className="game-moves">{moves}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (const line of lines) {
        const [a, b, c] = line
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}