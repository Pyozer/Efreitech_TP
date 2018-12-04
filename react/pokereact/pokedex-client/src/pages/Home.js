import React, { Component } from 'react';
import SearchBar from '../components/SearchBar'
import PokemonList from '../components/PokemonList';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false, pokemons: [], error: null, search: "" }
    }

    componentDidMount() {
        this.fetchAllPokemon()
    }

    fetchAllPokemon = () => {
        fetch('http://localhost:3001/pokemons')
            .then(res => res.json())
            .then(res => {
                if (res.data)
                    res.data = res.data.sort((a, b) => {
                        if (a.ndex > b.ndex) return 1
                        if (a.ndex < b.ndex) return -1
                        return 0
                    })
                this.setState({ dataLoaded: true, error: res.message, pokemons: res.data || [] })
            });
    }

    onSearch = (search) => {
        this.setState({
            search: search
        })
    }

    getFilteredPokemons = (search) => {
        const searchValue = search.toLowerCase()
        return this.state.pokemons.filter(v => {
            const searchValues = [
                v.nom, v.nomen, v.nomde, v.nomja, v.nomch, v.nomko, v.nomromanji, v.nomtm,
                v.espece, v.ndex, v.pokemon
            ].map(v => v ? v.toLowerCase() : '')
            return searchValues.join(' ').indexOf(searchValue) !== -1
        })
    }

    renderBody = () => {
        if (!this.state.dataLoaded) return
        if (this.state.error)
            return <h3>Error: {this.state.error}</h3>
        if (this.state.pokemons.length === 0)
            return <h3>No pokemon :/</h3>
        return <PokemonList pokemons={this.getFilteredPokemons(this.state.search)} />
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col s12 m8 l6 offset-m2 offset-l3">
                        <SearchBar onSearch={this.onSearch} />
                    </div>
                </div>
                {this.renderBody()}
            </>
        )
    }
}

export default Home;
