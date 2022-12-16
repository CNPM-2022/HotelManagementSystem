import ReactPaginate from 'react-paginate';

function TableUserPaginate({
    listUsers,
    handleClickViewButton,
    handleClickEditButton,
    handleClickDeleteButton,
    currentPage,
    itemsPerPage,
    pageCount,
    handlePageClick,
}) {
    return (
        <>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên người dùng</th>
                        <th scope="col">Email</th>
                        <th scope="col">Vai trò</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 ? (
                        listUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{itemsPerPage * (currentPage - 1) + index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Quản trị' : 'Người dùng'}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleClickViewButton(user)}>
                                        Xem
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickEditButton(user)}
                                    >
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleClickDeleteButton(user)}>
                                        Xóa
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

            <div className="user-pagination d-flex justify-content-center">
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
                    onPageChange={(event) => handlePageClick(+event.selected + 1)}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel={'< Trước'}
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
}

export default TableUserPaginate;
