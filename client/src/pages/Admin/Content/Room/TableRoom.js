function TableRoom({
    listRooms,
    setIsShowModalDeleteRoom,
    setDataRoomDelete,
    setIsShowModalUpdateRoom,
    setDataRoomUpdate,
    setIsShowModalViewRoom,
    setDataRoomView,
}) {
    const handleClickDeleteButton = (room) => {
        setDataRoomDelete(room);
        setIsShowModalDeleteRoom(true);
    };

    const handleClickEditButton = (room) => {
        setDataRoomUpdate(room);
        setIsShowModalUpdateRoom(true);
    };

    const handleClickViewButton = (room) => {
        setDataRoomView(room);
        setIsShowModalViewRoom(true);
    };

    return (
        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Phòng</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Sức chứa</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {listRooms && listRooms.length > 0 ? (
                    listRooms.map((room, index) => (
                        <tr key={room._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>{room.maxCount}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleClickViewButton(room)}>
                                    Xem
                                </button>
                                <button className="btn btn-warning mx-3" onClick={() => handleClickEditButton(room)}>
                                    Sửa
                                </button>
                                <button className="btn btn-danger" onClick={() => handleClickDeleteButton(room)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">
                            Không có dữ liệu
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default TableRoom;
