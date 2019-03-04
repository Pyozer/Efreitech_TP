import React, { Component } from 'react';
import SearchBar from '../components/SearchBar'
import PokemonList from '../components/PokemonList';
import { PageTitle } from '../Context';
import '../css/Home.css';
import MessageAction from '../components/MessageAction';
import BackIcon from '../components/BackIcon';

class SearchPokemons extends Component {
    constructor(props) {
        super(props)
        this.state = { search: "" }
    }

    onSearch = (search) => {
        this.setState({ search: search })
    }

    pad = (number) => ("000" + number).slice(-3)

    getPokemons = (search) => {
        let pokemons = []

        for (let i = parseInt(search); i <= 807; i++) { // Between $search and 807
            const iPad = this.pad(i)
            if (iPad.includes(search) && i !== 0)
                pokemons.push({ ndex: iPad, nom: "" })
        }
        return pokemons
    }

    renderErrorMsg = (error, type) => (
        <div className="row">
            <div className="col s12 m8 l6 offset-m2 offset-l3">
                <MessageAction message={error} type={type} />
            </div>
        </div>
    )

    renderBody = ({ search }) => {
        if (search.length === 0)
            return this.renderErrorMsg(<span>You can search a pokemon by NDEX</span>, 'primary')
        if (search.match(/[a-z]+/gi))
            return this.renderErrorMsg(<span>Only number are accepted !</span>)

        const ndex = parseInt(search)
        if (search.length > 0 && (ndex < 0 || ndex > 807))
            return this.renderErrorMsg(<span>Your search can only include number between 0 and 807</span>)

        return <PokemonList pokemons={this.getPokemons(search)} />
    }

    render() {
        return (
            <PageTitle title="Search pokemon by ID">
                <div className="flex align-items-center justify-content-between">
                    <div>
                        <BackIcon href="/" title="Back to home" />
                    </div>
                    <h2>Search pokemon by ID</h2>
                    <div style={{ width: 42 }}></div> { /* Empty div to correctly center align header (justify-content-between) */}
                </div>
                <div className="row mt-4">
                    <div className="col s12 m8 l6 offset-m2 offset-l3">
                        <SearchBar onSearch={this.onSearch} />
                    </div>
                </div>
                {this.renderBody(this.state)}
            </PageTitle>
        )
    }
}

export default SearchPokemons;
