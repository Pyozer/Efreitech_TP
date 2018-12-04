import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PokemonInfo from '../components/PokemonInfos'
import BackIcon from '../components/BackIcon'

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false, pokemon: null, error: null }
    }

    componentDidMount() {
        this.fetchPokemon(this.props.match.params.pokemonId)
    }

    fetchPokemon = (pokemonId) => {
        fetch(`http://localhost:3001/pokemons/${pokemonId}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ dataLoaded: true, error: res.message, pokemon: res.data })
            });
    }

    renderBody = () => {
        if (!this.state.dataLoaded) return
        if (this.state.error) return <h3>Error: {this.state.error}</h3>

        const pokemon = this.state.pokemon
        if (!pokemon) return <h3>No pokemon :/</h3>

        return <PokemonInfo pokemon={pokemon} />
    }

    render() {
        return (
            <>
                <BackIcon href="/" title="Back to home" className="fixed-top-left" />
                {this.renderBody()}
            </>
        )
    }
}

export default withRouter(Pokemon);
