function TableType({ listTypes, handleClickViewButton, handleClickEditButton, handleClickDeleteButton }) {
    return (
        <>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">List Rooms</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listTypes && listTypes.length > 0 ? (
                        listTypes.map((type, index) => (
                            <tr key={type._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{type.typeOfRooms}</td>
                                <td>{type.price}</td>
                                <td>{type.listRoom.join(', ')}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleClickViewButton(type)}>
                                        View
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickEditButton(type)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleClickDeleteButton(type)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TableType;
