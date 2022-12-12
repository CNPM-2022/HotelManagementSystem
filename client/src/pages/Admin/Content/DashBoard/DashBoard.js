import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getReportsByMonth } from '../../../../services/apiServices';
import Density from './components/Density';
import Revenue from './components/Revenue';

import './DashBoard.scss';

function DashBoard() {
    const [dataReport, setDataReport] = useState([]);

    useEffect(() => {
        fetchReportsByMonth();
    }, []);

    const fetchReportsByMonth = async () => {
        const res = await getReportsByMonth(1);
        console.log(res.data.data);

        if (res && res.data && res.data.success === true) {
            setDataReport(res.data.data);
        }
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content">
                <h3 className="mb-3">Thống kê doanh thu/mật độ</h3>

                <Tabs defaultActiveKey="room-type" className="mb-3" fill>
                    <Tab eventKey="room-type" title="Báo Cáo Doanh Thu Theo Loại Phòng">
                        <Revenue title="Báo Cáo Doanh Thu Theo Loại Phòng" />
                    </Tab>
                    <Tab eventKey="room-usage-density " title="Báo Cáo Mật Độ Sử Dụng Phòng">
                        <Density title="Báo Cáo Mật Độ Sử Dụng Phòng" />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default DashBoard;
