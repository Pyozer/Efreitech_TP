class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            error: null
        })
        fetch(BASE_API + "/login", {
            method: 'post',
            body: new URLSearchParams(new FormData(e.target))
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == "success")
                    Events.call("onNavbarLinkClicked", "/")
                else
                    this.setState({
                        error: data.message
                    })
            })
    }

    render() {
        return (
            <CenterFormPage title="Sign In" error={this.state.error}>
                <form onSubmit={this._onSubmit}>
                    <RoundedInput type="email" name="email" placeholder="Email" required={true} />
                    <RoundedInput type="password" name="password" placeholder="Password" required={true} />

                    <SubmitOutlineButton />
                </form>

                <div className="mt-5">
                    <span>You don't have an account ? </span>
                    <LinkPrevented onClick={() => Events.call("onNavbarLinkClicked", "/signup")}>Sign Up</LinkPrevented>
                </div>
            </CenterFormPage>
        )
    }
}