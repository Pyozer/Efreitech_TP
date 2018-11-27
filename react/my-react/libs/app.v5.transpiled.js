class Counter extends ReactComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            date: new Date()
        }

        setInterval(() => this._tick(), 1000)
    }

    _plusOne() {
        let newValue = this.state.value + 1
        this.setState({
            value: newValue
        })
    }

    _minusOne() {
        let newValue = this.state.value - 1
        this.setState({
            value: newValue
        })
    }

    _tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="h1">Counter component</h1>
                    <hr />
                    <div className="content">
                        <h2>Current date {this.state.date.toLocaleString()}</h2>
                        <p>The current value is</p>
                        <strong>{this.state.value}</strong>
                        <br />
                        <br />
                        <a className="button is-success" onclick="this._plusOne">Plus</a>
                        <span>  </span>
                        <a className="button is-danger" onclick="this._minusOne">Minus</a>
                    </div>
                </div>
            </section>
        )
    }
}

const parent = React.createElement('div', null, Counter)

ReactDOM.render(parent, document.getElementById('root'))