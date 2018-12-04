import React from 'react'
import { Link } from 'react-router-dom'
import iconBack from '../assets/back_icon.svg'

const BackIcon = ({ href, title, width = 42, className }) => (
    <Link to={href} title={title} className={className}>
        <img src={iconBack} alt={title} width={width} />
    </Link>
)

export default BackIcon