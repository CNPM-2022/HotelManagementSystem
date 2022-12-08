import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './Booking.scss';
import ManageBill from './ManageBill';
import ManageBooking from './ManageBooking';

function Booking() {
    return (
        <div className="admin-booking-container">
            <div className="admin-booking-content mt-4">
                <h3>Quản lý Đặt phòng</h3>

                <Tabs defaultActiveKey="bills" className="mb-3" fill>
                    <Tab eventKey="bills" title="Danh sách Đặt phòng">
                        <ManageBill />
                    </Tab>
                    <Tab eventKey="booking" title="Đặt phòng">
                        <ManageBooking />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default Booking;
