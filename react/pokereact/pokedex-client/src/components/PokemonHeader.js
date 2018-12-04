import React from 'react'
import PokemonImage from './PokemonImage';

const PokemonHeader = ({ndex, nom}) => (
    <div className="flex align-items-center justify-content-center">
        <h2>#{ndex} {nom}</h2>
        <div>
            <PokemonImage ndex={ndex} width="150" className="bounceEffect" />
        </div>
    </div>
)

export default PokemonHeader