const TableStripedRow = ({ className = "", data }) => (
    <div className={`col s12 ${className}`}>
        <TableStriped>
            {Object.entries(data).map(([key, value]) => (
                <TableRow title={key} content={value} key={key} />
            ))}
        </TableStriped>
    </div>
)

export default TableStripedRow