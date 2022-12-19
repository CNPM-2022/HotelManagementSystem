import { useState } from 'react';
import ModalViewBill from '../../../../components/Bill/ModalViewBill';

import TableBill from '../../../../components/Bill/TableBill';

function ManageBill({ listBills }) {
    const [isShowModalViewBill, setIsShowModalViewBill] = useState(false);
    const [dataBillView, setDataBillView] = useState({});

    return (
        <div className="manage-bill-container">
            <div className="content-table">
                <TableBill
                    role="ADMIN"
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
