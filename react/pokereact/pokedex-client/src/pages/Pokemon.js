import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PokemonInfo from '../components/PokemonInfos'
import PokemonHeader from '../components/PokemonHeader'
import BackIcon from '../components/BackIcon'
import { PageTitle } from '../Context';
import MessageAction from '../components/MessageAction';

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false }
    }

    componentDidMount() {
        this.fetchPokemon()
    }

    fetchPokemon = () => {
        fetch(`http://localhost:3001/pokemons/${this.props.match.params.pokemonId}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ dataLoaded: true, error: res.message, pokemon: res.data })
            });
    }

    renderErrorMsg = (error, action) => (
        <div className="row mt-4">
            <div className="col s12 m8 l6 offset-m2 offset-l3">
                <MessageAction message={error} onAction={action} />
            </div>
        </div>
    )

    renderBody = ({ dataLoaded, error, pokemon }) => {
        if (!dataLoaded)
            return <></>
        if (error)
            return this.renderErrorMsg(`Error: ${error}`, this.fetchPokemon)

        if (!pokemon) this.renderErrorMsg('No pokemon :/')

        return <PokemonInfo pokemon={pokemon} />
    }

    render() {
        const { pokemon } = this.state
        const pokemonId = this.props.match.params.pokemonId
        const pokemonName = pokemon && pokemon.nom ? pokemon.nom : ''

        return (
            <PageTitle title={`#${pokemonId} ${pokemonName}`}>
                <div className="flex align-items-center justify-content-between">
                    <div>
                        <BackIcon href="/" title="Back to home" />
                    </div>
                    <PokemonHeader ndex={pokemonId} nom={pokemonName} className="col s8" />
                    <div style={{ width: 42 }}></div> { /* Empty div to correctly center align header (justify-content-between) */}
                </div>
                {this.renderBody(this.state)}
            </PageTitle>
        )
    }
}

export default withRouter(Pokemon);
