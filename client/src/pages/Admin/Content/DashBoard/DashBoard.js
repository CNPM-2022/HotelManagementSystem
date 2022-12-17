import { useState } from 'react';

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
            const reportByRoomType = [];
            for (const item of data.reportByRoomType) {
                const type = listTypes.find((type) => type._id === item.roomType);
                if (type) {
                    item.roomTypeName = type.typeOfRooms;
                    totalRevenue += item.totalRevenue;
                    reportByRoomType.push(item);
                }
            }

            let totalRentDays = 0;
            const roomUsageDensityReport = [];
            for (const item of data.roomUsageDensityReport) {
                const room = listRooms.find((room) => room._id === item.room);
                if (room) {
                    item.roomNumber = room.roomNumber;
                    totalRentDays += item.totalRentDays;
                    roomUsageDensityReport.push(item);
                }
            }
            data.totalRevenue = totalRevenue;
            data.reportByRoomType = reportByRoomType;
            data.totalRentDays = totalRentDays;
            data.roomUsageDensityReport = roomUsageDensityReport;

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
