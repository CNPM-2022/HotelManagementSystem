import { useState } from 'react';

import _ from 'lodash';
import DateRangePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { createReportByMonthYear, getAllRooms, getAllRoomTypes } from '../../../../services/apiServices';
import Density from './components/Density';
import Revenue from './components/Revenue';

import './DashBoard.scss';

function DashBoard() {
    const [dataReport, setDataReport] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    const fetchReportByMonthYear = async ({ month, year }) => {
        setIsLoading(true);
        const res = await createReportByMonthYear({ month, year });

        if (res && res.data && res.data.success === true) {
            const data = res.data.data;
            const typeRes = await getAllRoomTypes();
            const roomRes = await getAllRooms();
            const listTypes = typeRes.data.data;
            const listRooms = roomRes.data.data;

            let totalRevenue = 0;
            for (const item of data.reportByRoomType) {
                item.roomTypeName = listTypes.find((type) => type._id === item.roomType).typeOfRooms;
                totalRevenue += item.totalRevenue;
            }

            let totalRentDays = 0;
            for (const item of data.roomUsageDensityReport) {
                item.roomNumber = listRooms.find((room) => room._id === item.room).roomNumber;
                totalRentDays += item.totalRentDays;
            }
            data.totalRevenue = totalRevenue;
            data.totalRentDays = totalRentDays;

            setDataReport(data);
        }
        setIsLoading(false);
    };

    const handleCreateReport = () => {
        const month = startDate.getUTCMonth() + 1;
        const year = startDate.getUTCFullYear();
        const data = { month, year };
        fetchReportByMonthYear(data);
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content mt-4">
                <h3 className="mb-3">Thống kê doanh thu/mật độ</h3>

                <div className="revenue-month-picker">
                    <label className="form-label">Chọn tháng:</label>
                    <DateRangePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                    />
                </div>
                <button className="btn btn-primary mt-3" onClick={handleCreateReport}>
                    Tìm kiếm
                </button>

                <hr />
                <div>
                    <Revenue dataReport={dataReport} isLoading={isLoading} title="Báo Cáo Doanh Thu Theo Loại Phòng" />
                    <Density dataReport={dataReport} isLoading={isLoading} title="Báo Cáo Mật Độ Sử Dụng Phòng" />
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
