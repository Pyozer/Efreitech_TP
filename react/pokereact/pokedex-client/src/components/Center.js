import React from 'react';

const Center = ({ children, className = "" }) => (
    <div className={`flex align-items-center justify-content-center h100 ${className}`}>
        {children}
    </div>
)

export default Center;
