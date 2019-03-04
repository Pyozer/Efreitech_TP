import React from 'react'
import PokemonImage from './PokemonImage';
import Center from './Center';

const PokemonHeader = ({ ndex, nom, className = "" }) => (
    <Center className={className}>
        <h2 className="m-0 mr-1">#{ndex} {nom}</h2>
        <div>
            <PokemonImage ndex={ndex} width="150" className="bounceEffect" />
        </div>
    </Center>
)

export default PokemonHeader