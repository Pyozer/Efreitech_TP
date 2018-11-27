const Link = ({ link }) => (
    <div className="card mt-1 mb-3 mr-2">
        <div className="card-body bg-light">
            <h6 className="card-title">{link.url}</h6>
            <p className="card-text">
                {link.tags.map((tag, index) => <Tag tag={tag} key={index} />)}
            </p>
        </div>
    </div>
)