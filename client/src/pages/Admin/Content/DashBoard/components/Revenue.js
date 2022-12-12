import { useState } from 'react';
import DateRangePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function Revenue({ title }) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className="admin-revenue-container mt-5">
                <h4 className="text-center">{title}</h4>
                <hr />
                <div className="revenue-month-picker">
                    <label className="form-label">Chọn tháng:</label>
                    <DateRangePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                    />
                </div>
                <button className="btn btn-primary mt-3 mb-5">Tìm kiếm</button>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col" colSpan="5" className="text-center">
                                {title}
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="text-center" colSpan="5">
                                Tháng ...
                            </th>
                        </tr>
                        <tr className="table-dark">
                            <th scope="col" className="text-center">
                                STT
                            </th>
                            <th scope="col" className="text-center">
                                Loại Phòng
                            </th>
                            <th scope="col" className="text-center">
                                Doanh Thu
                            </th>
                            <th scope="col" className="text-center">
                                Tỷ Lệ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="text-center" scope="row">
                                1
                            </th>
                            <th className="text-center">1</th>
                            <th className="text-center">1</th>
                            <th className="text-center">1</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Revenue;
