import { useEffect, useState } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

function TableUserPaginate({
    listUsers,
    handleClickViewButton,
    handleClickEditButton,
    handleClickDeleteButton,
    currentPage,
    setCurrentPage,
}) {
    const ITEMS_PER_PAGE = 6;

    const roleOptions = [
        {
            label: 'Quản trị',
            value: 'admin',
        },
        {
            label: 'Người dùng',
            value: 'user',
        },
    ];

    const initRoleCheckedState = roleOptions.reduce((result, roleOption) => {
        result[roleOption.value] = false;
        return { ...result };
    }, {});

    const [chunkedUsers, setChunkedUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [roleChecked, setRoleChecked] = useState(initRoleCheckedState);

    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (listUsers && listUsers.length > 0) {
            setPageCount(Math.ceil(listUsers.length / ITEMS_PER_PAGE));
            setChunkedUsers(_.chunk(listUsers, ITEMS_PER_PAGE));
        }
    }, [listUsers]);

    const handleSearchUsers = () => {
        let users = _.clone(listUsers);
        if (users.length === 0) return;

        if (searchValue) {
            users = listUsers.filter((user) => {
                return (
                    user.Name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    user.username.toLowerCase().includes(searchValue.toLowerCase())
                );
            });
        }

        let allRoleCheckedOrNotChecked =
            Object.keys(roleChecked).every((key) => roleChecked[key] === true) ||
            Object.keys(roleChecked).every((key) => roleChecked[key] === false);

        if (allRoleCheckedOrNotChecked === true) {
            setCurrentPage(1);
            setPageCount(Math.ceil(users.length / ITEMS_PER_PAGE));
            setChunkedUsers(_.chunk(users, ITEMS_PER_PAGE));
        } else {
            let roleValue = '';
            Object.keys(roleChecked).forEach((key) => {
                if (roleChecked[key] === true) roleValue = key;
            });

            const data = users.filter((user) =>
                roleValue === 'user' ? user.isAdmin === false : user.isAdmin === true,
            );

            setCurrentPage(1);
            setPageCount(Math.ceil(data.length / ITEMS_PER_PAGE));
            setChunkedUsers(_.chunk(data, ITEMS_PER_PAGE));
        }
    };

    const handleClearFiltered = () => {
        setSearchValue('');
        setRoleChecked(initRoleCheckedState);
    };

    return (
        <>
            <div className="col-md-6 mb-2">
                <label className="form-label">
                    <b>
                        <AiOutlineSearch />
                        <span className="mx-1" />
                        Tìm kiếm
                    </b>
                </label>
                <input
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="form-control"
                    placeholder="Nhập tên người dùng/họ và tên..."
                />
            </div>
            <div>
                <label className="form-label">
                    <b>
                        <FaUserAlt />
                        <span className="mx-1" />
                        Vai trò
                    </b>
                </label>
                <div>
                    {roleOptions.map((roleOption) => (
                        <div key={roleOption.value}>
                            <input
                                checked={roleChecked[roleOption.value]}
                                id={`filter-user-role-${roleOption.value}`}
                                type="checkbox"
                                onChange={(event) =>
                                    setRoleChecked((prev) => ({
                                        ...prev,
                                        [roleOption.value]: event.target.checked,
                                    }))
                                }
                            />
                            <span className="mx-1" />
                            <label htmlFor={`filter-user-role-${roleOption.value}`} className="form-label">
                                {roleOption.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn btn-primary" onClick={handleSearchUsers}>
                <AiOutlineSearch />
                Tìm kiếm
            </button>
            {(searchValue || Object.keys(roleChecked).some((key) => roleChecked[key] === true)) && (
                <button className="btn btn-link" onClick={handleClearFiltered}>
                    Xóa tất cả
                </button>
            )}
            <h4 className="text-center mt-5">Danh sách Người dùng</h4>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên người dùng</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Vai trò</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {chunkedUsers && chunkedUsers.length > 0 ? (
                        chunkedUsers[currentPage - 1].map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{ITEMS_PER_PAGE * (currentPage - 1) + index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.Name}</td>
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
                            <td colSpan="6" className="text-center">
                                Không có dữ liệu
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
                    onPageChange={(event) => setCurrentPage(+event.selected + 1)}
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
