import { PlusCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../services/apiServices';

import './ManageUser.scss';
import ModalDeleteUser from './ModalDeleteUser';
import ModalManageUser from './ModalManageUser';
import TableUser from './TableUser';

function ManageUser() {
    const [listUsers, setListUsers] = useState([]);

    const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);

    const [isShowModalViewUser, setIsShowModalViewUser] = useState(false);
    const [dataUserView, setDataUserView] = useState({});

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        const res = await getAllUsers();

        const data = res.data;

        if (res.status !== 200) {
            throw new Error(data.message);
        }

        setListUsers(data.users);
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
            <h3>Manage User</h3>
            <button className="btn btn-primary add-user-btn" onClick={() => setIsShowModalCreateUser(true)}>
                <PlusCircleFilled />
                Add new user
            </button>

            <div className="content-table">
                <TableUser
                    listUsers={listUsers}
                    handleClickViewButton={handleClickViewButton}
                    handleClickEditButton={handleClickEditButton}
                    handleClickDeleteButton={handleClickDeleteButton}
                />
            </div>

            <ModalManageUser
                type="CREATE"
                title="Add new user"
                show={isShowModalCreateUser}
                setShow={setIsShowModalCreateUser}
                fetchListUsers={fetchListUsers}
            />

            <ModalManageUser
                type="VIEW"
                title="User Information"
                show={isShowModalViewUser}
                setShow={setIsShowModalViewUser}
                dataUser={dataUserView}
                fetchListUsers={fetchListUsers}
            />

            <ModalManageUser
                type="EDIT"
                title="Edit user"
                show={isShowModalEditUser}
                setShow={setIsShowModalEditUser}
                dataUser={dataUserEdit}
                fetchListUsers={fetchListUsers}
            />

            <ModalDeleteUser
                show={isShowModalDeleteUser}
                setShow={setIsShowModalDeleteUser}
                dataUser={dataUserDelete}
                fetchListUsers={fetchListUsers}
            />
        </div>
    );
}

export default ManageUser;
