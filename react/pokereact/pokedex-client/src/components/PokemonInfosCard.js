import React from 'react'
import '../css/PokemonInfosCard.css'

const PokemonInfosCardRow = ({ title, value }) => (
    <div className="row py-row mb-0">
        <div className="col s6 xl5 truncate capitalize">{title}</div>
        <div className="col s6 xl7 truncate capitalize"><strong>{value}</strong></div>
    </div>
)

const PokemonInfosCard = ({ data }) => {
    let tableLines = []
    Object.entries(data).filter(([k, v]) => v).forEach(([key, value]) => {
        tableLines.push(<PokemonInfosCardRow title={key} value={value} />)
    })

    if (tableLines.length === 0) return <></>

    return (
        <div className="Pokemon-Infos-Card card">
            <div className="card-content striped">
                {tableLines}
            </div>
        </div>
    )
}

export default PokemonInfosCard