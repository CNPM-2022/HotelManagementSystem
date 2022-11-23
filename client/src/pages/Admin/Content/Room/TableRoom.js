function TableRoom({
    listRooms,
    setIsShowModalDeleteRoom,
    setDataRoomDelete,
    setIsShowModalUpdateRoom,
    setDataRoomUpdate,
}) {
    const handleClickDeleteButton = (room) => {
        setDataRoomDelete(room);
        setIsShowModalDeleteRoom(true);
    };

    const handleClickEditButton = (room) => {
        setDataRoomUpdate(room);
        setIsShowModalUpdateRoom(true);
    };

    return (
        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Number</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {listRooms && listRooms.length > 0 ? (
                    listRooms.map((room, index) => (
                        <tr key={room._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>{room.status}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => handleClickEditButton(room)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger mx-3" onClick={() => handleClickDeleteButton(room)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No data</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default TableRoom;
