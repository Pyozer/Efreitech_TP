const UserCard = ({ user }) => (
    <div className="card my-3 shadow">
        <div className="card-body">
            <h5 className="card-title">{user.nickname}</h5>
            <p className="card-text">{user.email}</p>
            <LinkList userId={user.id} />
        </div>
    </div>
)