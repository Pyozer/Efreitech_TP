import React from 'react'

const PokemonImage = ({ ndex, width, className = "" }) => {
    const pokemonUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${ndex}.png`

    return <img src={pokemonUrl} alt={`Pokemon #${ndex}`} className={className} width={width} />
}

export default PokemonImage