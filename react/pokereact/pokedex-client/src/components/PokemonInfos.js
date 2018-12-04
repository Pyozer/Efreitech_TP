import React from 'react';
import PokemonInfosCard from './PokemonInfosCard'
import TableRow from './TableRow';
import TableStriped from './StripedTable';
import Title from './Title';
import PokemonHeader from './PokemonHeader';

const PokemonInfo = ({ pokemon }) => {
    const pokemonF = pokemon
    Object.entries(pokemon).forEach(([key, value]) => {
        if (typeof value === 'string')
            pokemonF[key] = value.replace(/\[/g, '').replace(/\]/g, '').replace(/'/g, '').replace(/\{\{!\}\}/g, '')
    })
    console.log(pokemonF);

    return (
        <div>
            <PokemonHeader ndex={pokemonF.ndex} nom={pokemonF.nom} />

            <Title>Identité</Title>
            <div className="row">
                <div className="col s12 l6">
                    <TableStriped>
                        <TableRow title="Couleur :" content={pokemonF.couleur} />
                        <TableRow title="Espece :" content={pokemonF.espece} />
                        <TableRow title="Type 1 :" content={pokemonF.type1} />
                        <TableRow title="Type 2 :" content={pokemonF.type2} />
                        <TableRow title="Taille :" content={pokemonF.taille} />
                        <TableRow title="Poids :" content={pokemonF.poids} />
                        <TableRow title="Forme :" content={pokemonF.forme} />
                    </TableStriped>
                </div>
                <div className="col s12 l6">
                    <TableStriped>
                        <TableRow title="Pokemon :" content={pokemonF.pokemon} />
                        <TableRow title="Nom FR :" content={pokemonF.nom} />
                        <TableRow title="Nom EN :" content={pokemonF.nomen} />
                        <TableRow title="Nom DE :" content={pokemonF.nomde} />
                        <TableRow title="Nom TM :" content={pokemonF.nomtm} />
                        <TableRow title="Nom JA :" content={pokemonF.nomja} />
                        <TableRow title="Nom KO :" content={pokemonF.nomko} />
                        <TableRow title="Nom CH :" content={pokemonF.nomch} />
                        <TableRow title="Nom ROMANJI :" content={pokemonF.nomromanji} />
                    </TableStriped>
                </div>
                <div className="col s12 mt-2">
                    <TableStriped>
                        <TableRow title="Artwork Supp1 :" content={pokemonF['artwork_supp1-nom']} />
                        <TableRow title="Artwork Supp2 :" content={pokemonF['artwork_supp2-nom']} />
                        <TableRow title="Artwork Supp3 :" content={pokemonF['artwork_supp3-nom']} />
                        <TableRow title="Artwork Supp4 :" content={pokemonF['artwork_supp4-nom']} />
                        <TableRow title="Artwork Supp5 :" content={pokemonF['artwork_supp5-nom']} />
                        <TableRow title="Artwork Supp6 :" content={pokemonF['artwork_supp6-nom']} />
                    </TableStriped>
                </div>
            </div>
            <Title>Attaques</Title>
            <div className="row">
                {pokemonF.attaques.map((attaque, index) => (
                    <div className="col s12 m6 l4 xl3" key={index}>
                        <PokemonInfosCard data={attaque} />
                    </div>
                ))}
            </div>
            <Title>Autres informations</Title>
            <div className="row">
                <div className="col s12 m6 l5 xl4">
                    <PokemonInfosCard data={{
                        'ndex': pokemonF.ndex,
                        'njdex': pokemonF.njdex,
                        'hdex': pokemonF.hdex,
                        'fdex': pokemonF.fdex,
                        'adex': pokemonF.adex,
                        'odex': pokemonF.odex,
                        'opdex': pokemonF.opdex,
                    }} />
                </div>
                <div className="col s12 m6 l7 xl8">
                    <PokemonInfosCard data={{
                        'Capacité spécial 1': pokemonF.capspe1,
                        'Capacité spécial 2': pokemonF.capspe2,
                        'Capacité spécial 3': pokemonF.capspe3,
                        'Oeuf Pas': pokemonF.oeufpas,
                        'Groupe Oeuf 1': pokemonF.groupoeuf1,
                        'Groupe Oeuf 2': pokemonF.groupoeuf2,
                    }} />
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6">
                    <PokemonInfosCard data={{
                        'Effort value': pokemonF.effortval,
                        'Expérience value': pokemonF.expval,
                        'Expérience max': pokemonF.expmax,
                        'Capture value': pokemonF.captureval,
                    }} />
                </div>
                <div className="col s12 m6">
                    <PokemonInfosCard data={{
                        'Pinball RB GIF': pokemonF['pinballRB-gif'],
                        'Pinball RS GIF': pokemonF['pinballRS-gif'],
                        'Pinball RS': pokemonF.pinballRS,
                        'PDM': pokemonF.pdm,
                        'Almia': pokemonF.almia,
                        'Diff RS RFVF': pokemonF['diff_rs-rfvf'],
                        'Diff DP PT': pokemonF['diff_dp-pt'],
                        'Diff 4G FM': pokemonF['diff_4G-fm'],
                    }} />
                </div>
            </div>
        </div>
    )
}

export default PokemonInfo;
