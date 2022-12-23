import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getAllBills } from '../../../../services/apiServices';

import './Booking.scss';
import ManageBill from './ManageBill';
import ManageBooking from './ManageBooking';

function Booking() {
    const [listBills, setListBills] = useState([]);

    useEffect(() => {
        fetchAllBills();
    }, []);

    const fetchAllBills = async () => {
        const res = await getAllBills();

        if (res && res.data && res.data.success === true) {
            const data = res.data.bills
                .filter((bill) => bill.booking !== null)
                .map((bill) => {
                    bill.user.name = bill.user.Name;
                    return {
                        ...bill,
                        ...bill.booking,
                        totalAmount: +bill.totalAmount,
                        customer: bill.user.isAdmin === true ? bill.booking.customerList[0] : bill.user,
                        roomNumber: bill?.booking?.room?.roomNumber ? bill.booking.room.roomNumber : 999,
                        roomPrice: bill?.booking?.room?.price ? bill.booking.room.price : 100000,
                    };
                });

            setListBills(data);
        }
    };

    return (
        <div className="admin-booking-container">
            <div className="admin-booking-content">
                <h3>Quản lý Đặt phòng</h3>

                <Tabs defaultActiveKey="bills" className="mb-3" fill>
                    <Tab eventKey="bills" title="Danh sách Đặt phòng">
                        <ManageBill listBills={listBills} />
                    </Tab>
                    <Tab eventKey="booking" title="Đặt phòng">
                        <ManageBooking fetchAllBills={fetchAllBills} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default Booking;
