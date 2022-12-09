import { useState } from 'react';
import ModalViewBill from './ModalViewBill';

import TableBill from './TableBill';

function ManageBill({ listBills }) {
    const [isShowModalViewBill, setIsShowModalViewBill] = useState(false);
    const [dataBillView, setDataBillView] = useState({});

    return (
        <div className="manage-bill-container">
            <h4 className="text-center mt-5">Danh sách Đặt phòng</h4>
            <hr />
            <div className="content-table">
                <TableBill
                    listBills={listBills}
                    setIsShowModalViewBill={setIsShowModalViewBill}
                    setDataBillView={setDataBillView}
                />
            </div>

            <ModalViewBill dataBill={dataBillView} show={isShowModalViewBill} setShow={setIsShowModalViewBill} />
        </div>
    );
}

export default ManageBill;
