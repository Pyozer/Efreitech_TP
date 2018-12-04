import React from 'react';
import { Link } from 'react-router-dom'
import '../css/PokemonCard.css';
import PokemonImage from './PokemonImage';

const PokemonCard = ({ pokemon }) => (
    <Link to={"/" + pokemon.ndex} title={pokemon.nom}>
        <div className="card hoverable">
            <div className="card-image">
                <PokemonImage ndex={pokemon.ndex} />
            </div>
            <div className="card-content">
                <h6 className="blue-grey-text">#{pokemon.ndex}</h6>
                <h5 className="flow-text blue-grey-text">{pokemon.nom}</h5>
            </div>
        </div>
    </Link>
)

export default PokemonCard;
