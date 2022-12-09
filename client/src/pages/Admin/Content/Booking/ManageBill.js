import { useEffect, useState } from 'react';
import { getAllBills, getBookingById } from '../../../../services/apiServices';

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
            for (const bill of res.data.bills) {
                let billData = {
                    dateOfPayment: bill.dateOfPayment,
                };
                if (bill.booking?._id) {
                    const bookingRes = await getBookingById(bill.booking._id);
                    if (bookingRes && bookingRes.data && bookingRes.data.success === true) {
                        const bookingData = bookingRes.data.booking;
                        bookingData.user.name = bookingData.user.Name;

                        billData = {
                            ...billData,
                            ...bookingData,
                            roomNumber: bookingData.room.roomNumber,
                            roomPrice: 100000,
                            customer:
                                bookingData.user.isAdmin === true ? bookingData.customerList[0] : bookingData.user,
                        };

                        data.push(billData);
                    }
                }
            }
        }

        setListBills(data);
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
