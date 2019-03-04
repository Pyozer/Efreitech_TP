import React from 'react'
import { Link } from 'react-router-dom'
import iconBack from '../assets/back_icon.svg'
import iconBackWhite from '../assets/back_icon_white.svg'
import { ThemeContext } from '../Context';

const BackIcon = ({ href, title, width = 42, className = "" }) => (
    <ThemeContext.Consumer>
        {({ isDark }) => (
            <Link to={href} title={title} className={`${className} scaleEffect`}>
                <img src={isDark ? iconBackWhite : iconBack} alt={title} width={width} />
            </Link>
        )}
    </ThemeContext.Consumer>
)

export default BackIcon