import React from 'react';
import Title from './Title';

const Section = ({ children, title }) => (
    <>
        <Title>{title}</Title>
        <div className="row">
            {children}
        </div>
    </>
)

export default Section