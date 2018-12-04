import React from 'react'

const PokemonInfosCard = ({ data }) => {
    let tableLines = []
    Object.entries(data).forEach(([key, value]) => {
        if (value)
            tableLines.push(
                <tr key={key}>
                    <td className="capitalize">{key}</td>
                    <td className="capitalize">{value}</td>
                </tr>
            )
    })

    if (tableLines.length === 0) return <></>

    return (
        <div className="card">
            <div className="card-content">
                <table>
                    <tbody>
                        {tableLines}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PokemonInfosCard