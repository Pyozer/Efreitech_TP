import React from "react";

const TableStriped = ({ children }) => (
    <table className="striped table-text-larger">
        <tbody>
            {children}
        </tbody>
    </table>
)

export default TableStriped