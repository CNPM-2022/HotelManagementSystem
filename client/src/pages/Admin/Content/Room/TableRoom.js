import { useState } from 'react';
import ReactPaginate from 'react-paginate';

function TableRoom({
    ITEMS_PER_PAGE,
    pageCount,
    currentPage,
    handlePageChange,
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
        <>
            <h4 className="text-center">Danh sách phòng</h4>
            <br />
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

            {console.log()}

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
