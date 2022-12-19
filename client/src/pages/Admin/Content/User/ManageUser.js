import { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { getAllUsers } from '../../../../services/apiServices';

import './ManageUser.scss';
import ModalDeleteUser from './ModalDeleteUser';
import ModalManageUser from './ModalManageUser';
import TableUserPaginate from './TableUserPaginate';

function ManageUser() {
    const [listUsers, setListUsers] = useState([]);

    const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);

    const [isShowModalViewUser, setIsShowModalViewUser] = useState(false);
    const [dataUserView, setDataUserView] = useState({});

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const res = await getAllUsers();

        if (res && res.data && res.data.success === true) {
            setListUsers(res.data.users);
        }
    };

    const handleClickViewButton = (user) => {
        setDataUserView(user);
        setIsShowModalViewUser(true);
    };

    const handleClickEditButton = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);
    };

    const handleClickDeleteButton = (user) => {
        setDataUserDelete(user);
        setIsShowModalDeleteUser(true);
    };

    return (
        <div className="manage-user-container">
            <h3>Quản lý Người dùng</h3>
            <button className="btn btn-primary add-user-btn" onClick={() => setIsShowModalCreateUser(true)}>
                <BsFillPlusCircleFill />
                Thêm mới Người dùng
            </button>

            <div className="content-table">
                <TableUserPaginate
                    listUsers={listUsers}
                    handleClickViewButton={handleClickViewButton}
                    handleClickEditButton={handleClickEditButton}
                    handleClickDeleteButton={handleClickDeleteButton}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <ModalManageUser
                modalType="CREATE"
                title="Add new user"
                show={isShowModalCreateUser}
                setShow={setIsShowModalCreateUser}
                fetchAllUsers={fetchAllUsers}
                setCurrentPage={setCurrentPage}
            />

            <ModalManageUser
                modalType="VIEW"
                title="User Information"
                show={isShowModalViewUser}
                setShow={setIsShowModalViewUser}
                dataUser={dataUserView}
                fetchAllUsers={fetchAllUsers}
                setCurrentPage={setCurrentPage}
            />

            <ModalManageUser
                modalType="EDIT"
                title="Edit user"
                show={isShowModalEditUser}
                setShow={setIsShowModalEditUser}
                dataUser={dataUserEdit}
                fetchAllUsers={fetchAllUsers}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteUser
                show={isShowModalDeleteUser}
                setShow={setIsShowModalDeleteUser}
                dataUser={dataUserDelete}
                fetchAllUsers={fetchAllUsers}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ManageUser;
