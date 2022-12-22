import _ from 'lodash';
import { useEffect, useState } from 'react';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';

function Density({ dataReport, isLoading }) {
    const [data, setData] = useState({});
    const [sort, setSort] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataReport)) {
            const sortState = 'desc';

            const roomUsageDensityReport = _.orderBy(dataReport.roomUsageDensityReport, ['totalRentDays'], [sortState]);
            setData({
                month: dataReport.month,
                year: dataReport.year,
                totalRentDays: dataReport.totalRentDays,
                roomUsageDensityReport,
            });
            setSort(sortState);
        }
    }, [dataReport]);

    useEffect(() => {
        if (sort) {
            const roomUsageDensityReport = _.orderBy(dataReport.roomUsageDensityReport, ['totalRentDays'], [sort]);
            setData({
                month: dataReport.month,
                year: dataReport.year,
                totalRentDays: dataReport.totalRentDays,
                roomUsageDensityReport,
            });
        }
    }, [sort]);

    return (
        <>
            <div className="admin-density-container mt-5">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col" colSpan="5" className="text-center">
                                Báo Cáo Mật Độ Sử Dụng Phòng
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="text-center" colSpan="5">
                                {_.isEmpty(data) ? 'Tháng ...' : `Tháng ${data.month}/${data.year}`}
                            </th>
                        </tr>
                        <tr className="table-dark">
                            <th scope="col" className="text-center">
                                STT
                            </th>
                            <th scope="col" className="text-center">
                                Phòng
                            </th>
                            <th scope="col" className="text-center">
                                Số Ngày Thuê
                            </th>
                            <th scope="col" className="text-center">
                                <div className="d-flex align-items-center justify-content-center">
                                    Tỷ Lệ
                                    <div className="sort-container">
                                        {sort === 'desc' && (
                                            <span onClick={() => setSort('asc')}>
                                                <BsSortDown />
                                            </span>
                                        )}
                                        {sort === 'asc' && (
                                            <span onClick={() => setSort('desc')}>
                                                <BsSortDownAlt />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!_.isEmpty(data) &&
                            !isLoading &&
                            data.roomUsageDensityReport.map((item, index) => (
                                <tr key={item._id}>
                                    <th className="text-center" scope="row">
                                        {index + 1}
                                    </th>
                                    <th className="text-center">{item.roomNumber}</th>
                                    <th className="text-center">{item.totalRentDays}</th>
                                    <th className="text-center">
                                        {data.totalRentDays !== 0
                                            ? (item.totalRentDays / data.totalRentDays).toFixed(2)
                                            : 0}
                                    </th>
                                </tr>
                            ))}
                        {!_.isEmpty(data) && isLoading && (
                            <tr>
                                <th colSpan="4" className="text-center" scope="row">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </th>
                            </tr>
                        )}

                        {_.isEmpty(data) && (
                            <tr>
                                <th colSpan="4" className="text-center" scope="row">
                                    KHÔNG CÓ DỮ LIỆU
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Density;
