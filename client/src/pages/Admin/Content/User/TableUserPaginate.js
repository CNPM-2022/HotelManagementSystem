import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

    return (
        <>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('username')}</th>
                        <th scope="col">{t('email')}</th>
                        <th scope="col">{t('role')}</th>
                        <th scope="col">{t('action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 ? (
                        listUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{itemsPerPage * (currentPage - 1) + index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? t('ADMIN') : t('USER')}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleClickViewButton(user)}>
                                        {t('view')}
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickEditButton(user)}
                                    >
                                        {t('edit')}
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleClickDeleteButton(user)}>
                                        {t('delete')}
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
                    nextLabel={`${t('next')} >`}
                    onPageChange={(event) => handlePageClick(+event.selected + 1)}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel={`< ${t('prev')}`}
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
}

export default TableUserPaginate;
