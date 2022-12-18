import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function TableRoom({
    ITEMS_PER_PAGE,
    pageCount,
    currentPage,
    handlePageChange,
    listRooms,
    allRooms,
    setIsShowModalDeleteRoom,
    setDataRoomDelete,
    setIsShowModalUpdateRoom,
    setDataRoomUpdate,
    setIsShowModalViewRoom,
    setDataRoomView,
}) {
    const [searchValue, setSearchValue] = useState('');
    const [filterRooms, setFilterRooms] = useState([]);

    useEffect(() => {
        if (searchValue) {
            const rooms = allRooms.filter((room) => room.roomNumber.toString().includes(searchValue));
            setFilterRooms(rooms);
        }
    }, [searchValue]);

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
        <>
            <h4 className="text-center">Danh sách phòng</h4>
            <br />
            <div className="mb-2">
                <label className="form-label">Tìm kiếm phòng</label>
                <input
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="form-control"
                />
            </div>
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
                    {listRooms &&
                        listRooms.length > 0 &&
                        !searchValue &&
                        listRooms.map((room, index) => (
                            <tr key={room._id}>
                                <th scope="row">{ITEMS_PER_PAGE * (currentPage - 1) + (index + 1)}</th>
                                <td>{room.roomNumber}</td>
                                <td>{room.type}</td>
                                <td>{room.maxCount}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleClickViewButton(room)}>
                                        Xem
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickEditButton(room)}
                                    >
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleClickDeleteButton(room)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}

                    {searchValue &&
                        filterRooms &&
                        filterRooms.length > 0 &&
                        filterRooms.map((room, index) => (
                            <tr key={room._id}>
                                <th scope="row">{ITEMS_PER_PAGE * (currentPage - 1) + (index + 1)}</th>
                                <td>{room.roomNumber}</td>
                                <td>{room.type}</td>
                                <td>{room.maxCount}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleClickViewButton(room)}>
                                        Xem
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickEditButton(room)}
                                    >
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleClickDeleteButton(room)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    {(listRooms && listRooms.length === 0) ||
                        (searchValue && filterRooms && filterRooms.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                {listRooms && listRooms.length > 0 && (
                    <ReactPaginate
                        className="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        breakLabel="..."
                        nextLabel={'Sau >'}
                        onPageChange={(event) => handlePageChange(+event.selected + 1)}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel={'< Trước'}
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                )}
            </div>
        </>
    );
}

export default TableRoom;
