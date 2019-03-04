import React from "react";

const TableRow = ({ title, content }) => {
    if (!content) return <></>

    return (
        <tr>
            <td className="w50 pl-1">{title}</td>
            <td className="w50"><strong>{content}</strong></td>
        </tr>
    )
}

export default TableRow