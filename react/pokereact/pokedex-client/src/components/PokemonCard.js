import React from 'react';
import { Link } from 'react-router-dom'
import '../css/PokemonCard.css';
import PokemonImage from './PokemonImage';

const PokemonCard = ({ pokemon }) => (
    <Link to={`/${pokemon.ndex}`} title={pokemon.nom}>
        <div className="Pokemon-Card card scaleEffect">
            <div className="card-image">
                <PokemonImage ndex={pokemon.ndex} />
            </div>
            <div className="card-content">
                <h6 className="truncate">#{pokemon.ndex}</h6>
                <h5 className="truncate">{pokemon.nom}</h5>
            </div>
        </div>
    </Link>
)

export default PokemonCard;
