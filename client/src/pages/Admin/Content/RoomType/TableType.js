function TableType({ listTypes, handleClickViewButton, handleClickEditButton, handleClickDeleteButton }) {
    return (
        <>
            <h4 className="text-center mt-5">Danh sách Loại phòng</h4>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Danh sách Phòng</th>
                        <th scope="col">Hành động</th>
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
                                        Xem
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickEditButton(type)}
                                    >
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleClickDeleteButton(type)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TableType;
