import React from 'react'
import './css/square.css'

const Square = ({ onClick, value }) => (
    <div className="square" onClick={onClick}>
        <span>{value}</span>
    </div>
)

export default Square