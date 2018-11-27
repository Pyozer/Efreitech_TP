class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        this._loadUsers()
    }

    _loadUsers = () => {
        fetch(BASE_API + "/users")
            .then(response => response.json())
            .then(data => {
                if (data.status == "success")
                    this.setState({ users: data.users })
            });
    }

    render() {
        let usersFilter = this.state.users
        const search = this.props.searchUser.toLowerCase()
        usersFilter = this.state.users.filter(user => {
            const nickname = user.nickname.toLowerCase()
            const email = user.email.toLowerCase()
            return nickname.indexOf(search) > -1 || email.indexOf(search) > -1
        })

        if (usersFilter.length == 0)
            return <h4>No user found :/</h4>

        return usersFilter.map((value, index) => <UserCard user={value} key={index} />)
    }
}