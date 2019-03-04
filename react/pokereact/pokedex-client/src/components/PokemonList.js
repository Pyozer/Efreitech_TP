import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({pokemons}) => (
    <div className="row">
        {pokemons.map(pokemon => (
            <div className="col s6 m4 l3 xl2" key={pokemon.ndex}>
                <PokemonCard pokemon={pokemon} />
            </div>
        ))}
    </div>
)

export default PokemonList;
