class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null }
    }

    _onSubmit = (e) => {
        e.preventDefault()
        this.setState({ error: null })
        fetch(BASE_API + "/register", {
            method: 'post',
            body: new URLSearchParams(new FormData(e.target))
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == "success")
                    Events.call("onNavbarLinkClicked", "/")
                else
                    this.setState({ error: data.message })
            })
    }

    render() {
        return (
            <CenterFormPage title="Sign Up" error={this.state.error}>
                <form onSubmit={this._onSubmit}>
                    <RoundedInput name="nickname" placeholder="Nickname" required={true} />
                    <RoundedInput type="email" name="email" placeholder="Email" required={true} />
                    <RoundedInput type="password" name="password" placeholder="Password" required={true} />
                    <RoundedInput name="fullname" placeholder="Fullname" required={true} />

                    <SubmitOutlineButton />
                </form>

                <div className="mt-5">
                    <span>You already have an account ? </span>
                    <LinkPrevented onClick={() => Events.call("onNavbarLinkClicked", "/signin")}>Sign In</LinkPrevented>
                </div>
            </CenterFormPage>
        )
    }
}