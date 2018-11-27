const Navbar = ({ items, onInputChange, isSearchBar }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
            <a className="navbar-brand" href="#">MyPocket</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {items.map((item, index) =>
                        <NavItem title={item.title} href={item.href} key={index} />
                    )}
                </ul>
                {isSearchBar ?
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search user" aria-label="Search" onChange={(e) => onInputChange(e.target.value)} />
                    </form>
                    : null}
            </div>
        </div>
    </nav>
)