import { PlusCircleFilled } from '@ant-design/icons';
import { useState } from 'react';

import './ManageUser.scss';
import ModalDeleteUser from './ModalDeleteUser';
import ModalManageUser from './ModalManageUser';
import TableUser from './TableUser';

function ManageUser() {
    const listUsers = [
        {
            id: 1,
            username: 'taivan',
            email: 'taivannho5a@gmail.com',
            role: 'ADMIN',
        },
        {
            id: 2,
            username: 'test2',
            email: 'test2@gmail.com',
            role: 'USER',
        },
        {
            id: 3,
            username: 'test3',
            email: 'test3@gmail.com',
            role: 'USER',
        },
        {
            id: 4,
            username: 'test4',
            email: 'test4@gmail.com',
            role: 'ADMIN',
        },
    ];

    const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);

    const [isShowModalViewUser, setIsShowModalViewUser] = useState(false);
    const [dataUserView, setDataUserView] = useState({});

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

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

            <ModalManageUser type="CREATE" show={isShowModalCreateUser} setShow={setIsShowModalCreateUser} />

            <ModalManageUser
                type="VIEW"
                show={isShowModalViewUser}
                setShow={setIsShowModalViewUser}
                dataUser={dataUserView}
            />

            <ModalManageUser
                type="EDIT"
                show={isShowModalEditUser}
                setShow={setIsShowModalEditUser}
                dataUser={dataUserEdit}
            />

            <ModalDeleteUser
                show={isShowModalDeleteUser}
                setShow={setIsShowModalDeleteUser}
                dataUser={dataUserDelete}
            />
        </div>
    );
}

export default ManageUser;
