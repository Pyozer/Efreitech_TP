import React from 'react'

const PokemonInfosCard = ({ data }) => (
    <div className="card">
        <div className="card-content">
            <table>
                <tbody>
                    {Object.entries(data).map(([key, value]) => {
                        if (!value) return <></>
                        return (
                            <tr key={key}>
                                <td className="capitalize">{key}</td>
                                <td className="capitalize">{value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
)

export default PokemonInfosCard