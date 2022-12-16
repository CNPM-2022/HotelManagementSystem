import { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import _ from 'lodash';

import { getAllRoomTypes } from '../../../../services/apiServices';
import './ManageRoomType.scss';
import ModalManageType from './ModalManageType';
import TableType from './TableType';
import ModalDeleteType from './ModalDeleteType';

function ManageRoomType() {
    const [listTypes, setListTypes] = useState([]);

    const [isShowModalCreateType, setIsShowModalCreateType] = useState(false);

    const [isShowModalViewType, setIsShowModalViewType] = useState(false);
    const [dataTypeView, setDataTypeView] = useState({});

    const [isShowModalUpdateType, setIsShowModalUpdateType] = useState(false);
    const [dataTypeUpdate, setDataTypeUpdate] = useState({});

    const [isShowModalDeleteType, setIsShowModalDeleteType] = useState(false);
    const [dataTypeDelete, setDataTypeDelete] = useState({});

    useEffect(() => {
        fetchAllRoomTypes();
    }, []);

    const fetchAllRoomTypes = async () => {
        const res = await getAllRoomTypes();

        if (res.status !== 200) return;
        if (res.data.success === false) return;

        const data = _.orderBy(res.data.data, ['typeOfRooms'], ['asc']);

        setListTypes(data);
    };

    const handleClickViewButton = (type) => {
        setDataTypeView(type);
        setIsShowModalViewType(true);
    };

    const handleClickEditButton = (type) => {
        setDataTypeUpdate(type);
        setIsShowModalUpdateType(true);
    };

    const handleClickDeleteButton = (type) => {
        setDataTypeDelete(type);
        setIsShowModalDeleteType(true);
    };

    return (
        <div className="manage-room-type-container">
            <h3>Quản lý Loại phòng</h3>
            <button className="btn btn-primary add-type-btn" onClick={() => setIsShowModalCreateType(true)}>
                <BsFillPlusCircleFill />
                Thêm loại mới
            </button>

            <div className="content-table">
                <TableType
                    listTypes={listTypes}
                    handleClickViewButton={handleClickViewButton}
                    handleClickEditButton={handleClickEditButton}
                    handleClickDeleteButton={handleClickDeleteButton}
                    fetchAllRoomTypes={fetchAllRoomTypes}
                />
            </div>

            <ModalManageType
                modalType="CREATE"
                title="Thêm loại mới"
                show={isShowModalCreateType}
                setShow={setIsShowModalCreateType}
                fetchAllRoomTypes={fetchAllRoomTypes}
            />

            <ModalManageType
                modalType="VIEW"
                title="Thông tin Loại phòng"
                show={isShowModalViewType}
                setShow={setIsShowModalViewType}
                dataType={dataTypeView}
                fetchAllRoomTypes={fetchAllRoomTypes}
            />

            <ModalManageType
                modalType="UPDATE"
                title="Cập nhật Loại phòng"
                show={isShowModalUpdateType}
                setShow={setIsShowModalUpdateType}
                dataType={dataTypeUpdate}
                fetchAllRoomTypes={fetchAllRoomTypes}
            />

            <ModalDeleteType
                show={isShowModalDeleteType}
                setShow={setIsShowModalDeleteType}
                dataTypeDelete={dataTypeDelete}
                fetchAllRoomTypes={fetchAllRoomTypes}
            />
        </div>
    );
}

export default ManageRoomType;
