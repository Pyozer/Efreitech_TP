import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PokemonList from '../components/PokemonList';
import MessageAction from '../components/MessageAction';
import { PageTitle, ThemeContext } from '../Context';
import logoPokedex from '../assets/Pokedex_logo.png';
import searchIcon from '../assets/search_icon.svg';
import sortIcon from '../assets/sort_icon.svg'
import sortIconWhite from '../assets/sort_icon_white.svg'
import '../css/Home.css';
import SortView from '../components/SortView';

class Home extends Component {
    sortTypes = ["ndex", "nom", "forme", "taille", "poids", "espece"]

    defaultState = {
        dataLoaded: false, pokemons: [], error: null, search: "", sortVisible: false, sortType: this.sortTypes[0]
    }

    constructor(props) {
        super(props)
        this.state = this.defaultState
    }

    componentDidMount() {
        this.fetchAllPokemon()
    }

    fetchAllPokemon = () => {
        this.setState({ dataLoaded: false, pokemons: [], error: null, search: "" })

        fetch('http://localhost:3001/pokemons')
            .then(res => res.json())
            .then(res => {
                this.setState({ dataLoaded: true, error: res.message, pokemons: res.data })
            }).catch(err => this.setState({ dataLoaded: true, error: err.message }))
    }

    onSearch = (search) => {
        this.setState({ search: search })
    }

    sortPokemons = (pokemons) => {
        if (!pokemons) return []

        const selectedSortType = this.state.sortType

        let key = this.sortTypes[0]
        this.sortTypes.forEach(sortType => {
            if (sortType === selectedSortType)
                key = sortType
        })

        return pokemons.sort((a, b) => {
            if (a[key] > b[key]) return 1
            if (a[key] < b[key]) return -1
            return 0
        })
    }

    getFilteredPokemons = (search) => {
        const searchValue = search.toLowerCase()
        return this.sortPokemons(
            this.state.pokemons.filter(v => {
                const searchValues = [
                    v.nom, v.nomen, v.nomde, v.nomja, v.nomch, v.nomko, v.nomromanji, v.nomtm,
                    v.espece, v.ndex, v.pokemon
                ].map(v => v ? v.toLowerCase() : '')
                return searchValues.join(' ').indexOf(searchValue) !== -1
            })
        )
    }

    renderErrorMsg = (error, action) => (
        <div className="row">
            <div className="col s12 m8 l6 offset-m2 offset-l3">
                <MessageAction message={error} onAction={action} />
            </div>
        </div>
    )

    renderBody = ({ dataLoaded, error, search }) => {
        if (!dataLoaded)
            return <></>
        if (error)
            return this.renderErrorMsg(`Error: ${error}`, this.fetchAllPokemon)

        const pokemonsFiltered = this.getFilteredPokemons(search)
        if (pokemonsFiltered.length === 0) {
            if (search.length > 0)
                return this.renderErrorMsg(<span>No search result with <strong>{search}</strong></span>)
            return this.renderErrorMsg(<span>There isn't any pokemon in database</span>)
        }
        return <PokemonList pokemons={pokemonsFiltered} />
    }

    render() {
        const { sortVisible, sortType } = this.state

        return (
            <ThemeContext.Consumer>
                {({ isDark }) => (
                    <PageTitle title="Home">
                        <header className="App-header">
                            <Link to="/" title="Home">
                                <img src={logoPokedex} className="App-logo" alt="logo" />
                            </Link>
                        </header>
                        <main>
                            <div className="row">
                                <div className="col s12 m8 l6 offset-m2 offset-l3">
                                    <div className="flex align-items-center">
                                        <div className="flex-grow">
                                            <SearchBar onSearch={this.onSearch} />
                                        </div>
                                        <div className="dropdown">
                                            <img src={isDark ? sortIconWhite : sortIcon} className="ml-2 pl-1 pr-2 pt-2 pointer scaleEffect" onClick={() => {
                                                this.setState({ sortVisible: !sortVisible })
                                            }} alt="Sort pokemons" />
                                            <SortView
                                                visible={sortVisible}
                                                sortList={this.sortTypes}
                                                selectedSort={sortType}
                                                onSortChange={sortType => {
                                                    this.setState({ sortType: sortType, sortVisible: !sortVisible })
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.renderBody(this.state)}
                        </main>
                        <div className="fixed-bottom-right">
                            <Link
                                to="/search"
                                className="btn-floating btn-large waves-effect waves-light red flex align-items-center justify-content-center"
                                title="Search pokemon by ID">
                                <img src={searchIcon} width="30" alt="Search pokemon by ID" />
                            </Link>
                        </div>
                    </PageTitle>
                )}
            </ThemeContext.Consumer>
        )
    }
}

export default Home;
