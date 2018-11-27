const LinkPrevented = ({ className, title, children, onClick }) => (
    <a href="" title={title} className={className} onClick={(e) => {
        e.preventDefault()
        onClick()
    }}>{children}</a>
)