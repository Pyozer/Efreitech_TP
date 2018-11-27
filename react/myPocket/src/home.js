const Home = ({ searchUser }) => (
    <main className="col-md-9 ml-sm-auto col-lg-10 p-5">
        <h3 className="mb-5 mt-1">List of users</h3>

        <UserList searchUser={searchUser} />
    </main>
)