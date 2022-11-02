import { PlusCircleFilled } from '@ant-design/icons';
import { useState } from 'react';

import './ManageUser.scss';
import ModalManageUser from './ModalManageUser';

function ManageUser() {
    const [isShowModal, setIsShowModal] = useState(false);
    return (
        <div className="manage-user-container">
            <h3>Manage User</h3>
            <button className="btn btn-primary add-user-btn" onClick={() => setIsShowModal(true)}>
                <PlusCircleFilled />
                Add new user
            </button>

            <ModalManageUser show={isShowModal} setShow={setIsShowModal} />
        </div>
    );
}

export default ManageUser;
