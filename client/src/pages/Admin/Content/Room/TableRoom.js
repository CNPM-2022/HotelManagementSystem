import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscGroupByRefType } from 'react-icons/vsc';

function TableRoom({
    listRooms,
    typeOptions,
    setIsShowModalDeleteRoom,
    setDataRoomDelete,
    setIsShowModalUpdateRoom,
    setDataRoomUpdate,
    setIsShowModalViewRoom,
    setDataRoomView,
    currentPage,
    setCurrentPage,
}) {
    const ITEMS_PER_PAGE = 6;

    const [chunkedRooms, setChunkedRooms] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [typesChecked, setTypesChecked] = useState({});

    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (typeOptions && typeOptions.length > 0) {
            setTypesChecked(
                typeOptions.reduce((result, typeOption) => {
                    result[typeOption.value] = false;
                    return { ...result };
                }, {}),
            );
        }
    }, [typeOptions]);

    useEffect(() => {
        if (listRooms && listRooms.length > 0) {
            setPageCount(Math.ceil(listRooms.length / ITEMS_PER_PAGE));
            setChunkedRooms(_.chunk(listRooms, ITEMS_PER_PAGE));
        }
    }, [listRooms]);

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

    const handleSearchRooms = () => {
        let rooms = _.clone(listRooms);
        if (rooms.length === 0) return;

        if (searchValue) {
            rooms = listRooms.filter((room) => room.roomNumber.toString().includes(searchValue));
        }

        let allTypesCheckedOrNotChecked =
            Object.keys(typesChecked).every((key) => typesChecked[key] === true) ||
            Object.keys(typesChecked).every((key) => typesChecked[key] === false);

        if (allTypesCheckedOrNotChecked === true) {
            setCurrentPage(1);
            setPageCount(Math.ceil(rooms.length / ITEMS_PER_PAGE));
            setChunkedRooms(_.chunk(rooms, ITEMS_PER_PAGE));
        } else {
            const data = rooms.filter((room) => {
                let isFiltered = true;
                Object.keys(typesChecked).forEach((key) => {
                    if (typesChecked[key] === false && key === room.type) isFiltered = false;
                });

                return isFiltered;
            });

            setCurrentPage(1);
            setPageCount(Math.ceil(data.length / ITEMS_PER_PAGE));
            setChunkedRooms(_.chunk(data, ITEMS_PER_PAGE));
        }
    };

    const handleClearFiltered = () => {
        setSearchValue('');
        setTypesChecked(
            typeOptions.reduce((result, typeOption) => {
                result[typeOption.value] = false;
                return { ...result };
            }, {}),
        );
    };

    return (
        <>
            <div className="mb-2">
                <div className="col-md-4 mb-2">
                    <label className="form-label">
                        <b>
                            <AiOutlineSearch />
                            <span className="mx-1" />
                            Tìm kiếm phòng
                        </b>
                    </label>
                    <input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="form-control"
                        placeholder="Nhập số phòng..."
                    />
                </div>
                <div>
                    <label className="form-label">
                        <b>
                            <VscGroupByRefType />
                            <span className="mx-1" />
                            Loại
                        </b>
                    </label>
                    <div>
                        {typeOptions.map((typeOption) => (
                            <div key={typeOption.value}>
                                <input
                                    checked={typesChecked[typeOption.value]}
                                    id={`filter-room-type-${typeOption.value}`}
                                    type="checkbox"
                                    onChange={(event) =>
                                        setTypesChecked((prev) => ({
                                            ...prev,
                                            [typeOption.value]: event.target.checked,
                                        }))
                                    }
                                />
                                <span className="mx-1" />
                                <label htmlFor={`filter-room-type-${typeOption.value}`} className="form-label">
                                    {typeOption.value}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleSearchRooms}>
                    <AiOutlineSearch />
                    Tìm kiếm
                </button>
                {(searchValue || Object.keys(typesChecked).some((key) => typesChecked[key] === true)) && (
                    <button className="btn btn-link" onClick={handleClearFiltered}>
                        Xóa tất cả
                    </button>
                )}
            </div>
            <h4 className="text-center">Danh sách phòng</h4>
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
                    {chunkedRooms && chunkedRooms.length > 0 ? (
                        chunkedRooms[currentPage - 1].map((room, index) => (
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
                            <td colSpan="5" className="text-center">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                {chunkedRooms && chunkedRooms.length > 0 && (
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
                        onPageChange={(event) => setCurrentPage(+event.selected + 1)}
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
