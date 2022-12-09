import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getAllBills } from '../../../../services/apiServices';
import ModalViewBill from '../../../Admin/Content/Booking/ModalViewBill';
import TableBill from '../../../Admin/Content/Booking/TableBill';

function MyBooking() {
    const [listBills, setListBills] = useState([]);

    const [isShowModalViewBill, setIsShowModalViewBill] = useState(false);
    const [dataBillView, setDataBillView] = useState({});

    const user = useSelector((state) => state.auth.user);
    console.log(user);
    useEffect(() => {
        fetchAllBills();
    }, []);

    const fetchAllBills = async () => {
        const res = await getAllBills();

        if (res && res.data && res.data.success === true) {
            const data = res.data.bills
                .filter((bill) => bill.booking !== null && bill.user._id === user.id)
                .map((bill) => ({
                    ...bill,
                    ...bill.booking,
                    customer: bill.user,
                    roomNumber: 123,
                    roomPrice: 100000,
                }));

            setListBills(data);
        }
    };

    return (
        <div className="container-xl px-4">
            <nav className="nav nav-borders">
                <h2 className="fs-bolder ml-3">
                    Lịch sử Đặt phòng <i className="bi bi-bag"></i>
                </h2>
            </nav>
            <hr className="mt-0 mb-4" />
            <div className="manage-bill-container">
                <div className="content-table">
                    <TableBill
                        listBills={listBills}
                        setIsShowModalViewBill={setIsShowModalViewBill}
                        setDataBillView={setDataBillView}
                    />
                </div>

                <ModalViewBill dataBill={dataBillView} show={isShowModalViewBill} setShow={setIsShowModalViewBill} />
            </div>
        </div>
    );
}

export default MyBooking;
