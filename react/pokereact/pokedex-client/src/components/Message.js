import React from 'react';
import '../css/Message.css'

const Message = ({ children, type = "danger", className = "" }) => (
    <div className={`alert alert-${type} ${className}`}>
        {children}
    </div>
)

export default Message;