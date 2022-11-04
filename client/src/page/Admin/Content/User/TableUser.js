function TableUser({ listUsers, handleClickViewButton, handleClickEditButton, handleClickDeleteButton }) {
    return (
        <table className="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'ADMIN' : 'USER'}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleClickViewButton(user)}>
                                    View
                                </button>
                                <button
                                    className="btn btn-danger mx-3"
                                    onClick={() => handleClickEditButton(user, user.id)}
                                >
                                    Edit
                                </button>
                                <button className="btn btn-warning" onClick={() => handleClickDeleteButton(user)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                            Not found data
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default TableUser;
