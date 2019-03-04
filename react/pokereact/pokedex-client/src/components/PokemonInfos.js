import React from 'react';
import PokemonInfosCard from './PokemonInfosCard'
import TableRow from './TableRow';
import TableStriped from './StripedTable';
import Section from './Section';

const TableStripedRow = ({ className, data }) => (
    <div className={`col s12 ${className}`}>
        <TableStriped>
            {Object.entries(data).map(([key, value]) => (
                <TableRow title={key} content={value} key={key} />
            ))}
        </TableStriped>
    </div>
)

const PokemonInfo = ({ pokemon }) => {
    const data = pokemon
    Object.entries(pokemon).forEach(([key, value]) => {
        if (typeof value === 'string') {
            data[key] = value.replace(/\[/g, '')
                .replace(/\]/g, '')
                .replace(/'/g, '')
                .replace(/\{\{!\}\}/g, '')
        }
    })

    return <>
        <Section title="Identité">
            <TableStripedRow className='l6' data={{
                'Couleur': data.couleur, 'Espece': data.espece, 'Type 1': data.type1, 'Type 2': data.type2,
                'Taille': data.taille, 'Poids': data.poids, 'Forme': data.forme
            }} />

            <TableStripedRow className='l6' data={{
                'Pokemon': data.pokemon, 'Nom FR': data.nom, 'Nom EN': data.nomen, 'Nom DE': data.nomde, 'Nom TM': data.nomtm,
                'Nom JA': data.nomja, 'Nom KO': data.nomko, 'Nom CH': data.nomch, 'Nom ROMANJI': data.nomromanji
            }} />
        </Section>

        <Section title="Attaques">
            {data.attaques.map((attaque, index) => (
                <div className="col s12 m6 l4 xl3" key={index}>
                    <PokemonInfosCard data={attaque} />
                </div>
            ))}
        </Section>

        <Section title="Autres informations">
            <div className="col s12 m6 l5 xl4">
                <PokemonInfosCard data={{
                    'Effort': (data.effortval || "").split(';').join(' / '), 'Expérience': data.expval,
                    'Expérience max': data.expmax, 'Capture ': data.captureval,
                }} />
                <PokemonInfosCard data={{
                    'NDEX': data.ndex, 'NJDEX': data.njdex, 'HDEX': data.hdex, 'FDEX': data.fdex,
                    'ADEX': data.adex, 'ODEX': data.odex, 'OPDEX': data.opdex,
                }} />
            </div>
            <div className="col s12 m6 l7 xl8">
                <PokemonInfosCard data={{
                    'Capacité spéciale 1': data.capspe1, 'Capacité spéciale 2': data.capspe2, 'Capacité spéciale 3': data.capspe3,
                    'Oeuf Pas': data.oeufpas, 'Groupe Oeuf 1': data.groupoeuf1, 'Groupe Oeuf 2': data.groupoeuf2,
                }} />
                <PokemonInfosCard data={{
                    'Pinball RB GIF': data['pinballRB-gif'], 'Pinball RS GIF': data['pinballRS-gif'], 'Pinball RS': data.pinballRS,
                    'PDM': data.pdm, 'Almia': data.almia, 'Diff RS RFVF': data['diff_rs-rfvf'], 'Diff DP PT': data['diff_dp-pt'],
                    'Diff 4G FM': data['diff_4G-fm'],
                }} />
            </div>
            <div className="col s12">
                <PokemonInfosCard data={{
                    'Sensibilité Combat': data['sensib-combat'], 'Sensibilité Eau': data['sensib-eau'], 'Sensibilité Electrique': data['sensib-électrique'],
                    'Sensibilité Feu': data['sensib-feu'], 'Sensibilité Glace': data['sensib-glace'], 'Sensibilité Psy': data['sensib-psy'],
                    'RMQ Insecte': data['rmq-insecte'], 'RMQ Insecte Num': data['rmq-insecte-num'],
                    'RMQ Glace': data['rmq-glace'], 'RMQ Glace Num': data['rmq-glace-num'], 'RMQ Spectre Num': data['rmq-spectre-num'],
                    'RMQ Feu': data['rmq-feu'], 'RMQ Feu Num': data['rmq-feu-num'], 'RMQ Spectre': data['rmq-spectre'],
                }} />
            </div>
            <TableStripedRow className='mt-2' data={{
                'Artwork Supp1': data['artwork_supp1-nom'], 'Artwork Supp2': data['artwork_supp2-nom'], 'Artwork Supp3': data['artwork_supp3-nom'],
                'Artwork Supp4': data['artwork_supp4-nom'], 'Artwork Supp5': data['artwork_supp5-nom'], 'Artwork Supp6': data['artwork_supp6-nom']
            }} />
        </Section>
    </>
}

export default PokemonInfo;
