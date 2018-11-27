class LinkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { links: [] };
    }

    componentDidMount() {
        this._loadLinks()
    }

    _loadLinks() {
        fetch(BASE_API + "/users/" + this.props.userId + "/links")
            .then(response => response.json())
            .then(data => {
                if (data.status == "success") {
                    let links = data.links
                    links.forEach(link => link.tags = link.tags.split(', ').map(tag => {
                        return { name: tag }
                    }))
                    this.setState({ links: links })
                }
            });
    }

    render() {
        return (
            <div className="row">
                {this.state.links.map((link) => (
                    <div className="col col-lg-6 col-xl-4" key={link.id_link}>
                        <Link link={link} />
                    </div>
                ))}
            </div>
        )
    }
}