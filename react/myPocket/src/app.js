class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { search: "", route: "/" }
    }

    componentDidMount() {
        Events.add("onNavbarLinkClicked", href => {
            this.setState({
                route: href
            })
        })
    }

    _onInputSearchChange = (search) => {
        this.setState({ search })
    }

    render() {
        const navItems = [
            { title: "Home", href: "/" },
            { title: "Sign Up", href: "/signup" },
            { title: "Sign In", href: "/signin" }
        ]
        const sideItems = [
            { title: "Dashboard", icon: "fas fa-home", href: "#dashboard" },
            { title: "Account", icon: "fas fa-user", href: "#account" },
            { title: "Settings", icon: "fas fa-sliders-h", href: "#settings" }
        ]

        let content;
        if (this.state.route == "/")
            content = <Home searchUser={this.state.search} />
        else if (this.state.route == "/signup")
            content = <Register />
        else if (this.state.route == "/signin")
            content = <Login />
        else 
            content = <PageNotFound />

        return <div>
            <Navbar items={navItems} onInputChange={this._onInputSearchChange} isSearchBar={this.state.route == '/'} />
            <div className="container-fluid">
                <div className="row">
                    <SideBar items={sideItems} />
                    {content}
                </div>
            </div>
            <Footer />
        </div>
    }
}