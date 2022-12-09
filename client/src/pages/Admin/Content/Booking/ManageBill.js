import { useEffect, useState } from 'react';
import { getAllBills } from '../../../../services/apiServices';

import TableBill from './TableBill';

function ManageBill() {
    const [listBills, setListBills] = useState([]);

    useEffect(() => {
        fetchAllBills();
    }, []);

    const fetchAllBills = async () => {
        const res = await getAllBills();
        const data = [];

        if (res && res.data && res.data.success === true) {
            setListBills(res.data.bills);
        }
    };

    return (
        <div className="manage-bill-container">
            <h5>Danh sách Đặt phòng</h5>
            <hr />
            <div className="content-table">
                <TableBill listBills={listBills} />
            </div>
        </div>
    );
}

export default ManageBill;
