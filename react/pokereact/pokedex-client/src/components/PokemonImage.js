import React from 'react'

const PokemonImage = ({ ndex, width, className }) => {
    const pokemonUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + parseInt(ndex) + '.png'
    
    return <img src={pokemonUrl} alt={"Pokemon #" + ndex} className={className} width={width} />
}

export default PokemonImage