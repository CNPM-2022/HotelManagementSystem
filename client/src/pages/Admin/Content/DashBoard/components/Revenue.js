import _ from 'lodash';
import { useEffect, useState } from 'react';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';
import FormatPrice from '../../../../../components/FormatPrice/FormatPrice';

function Revenue({ dataReport, isLoading }) {
    const [data, setData] = useState({});
    const [sort, setSort] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataReport)) {
            const sortState = 'desc';

            const reportByRoomType = _.orderBy(dataReport.reportByRoomType, ['totalRevenue'], [sortState]);
            setData({
                month: dataReport.month,
                year: dataReport.year,
                totalRevenue: dataReport.totalRevenue,
                reportByRoomType,
            });
            setSort(sortState);
        }
    }, [dataReport]);

    useEffect(() => {
        if (sort) {
            const reportByRoomType = _.orderBy(dataReport.reportByRoomType, ['totalRevenue'], [sort]);
            setData({
                month: dataReport.month,
                year: dataReport.year,
                totalRevenue: dataReport.totalRevenue,
                reportByRoomType,
            });
        }
    }, [sort]);

    return (
        <>
            <div className="admin-revenue-container mt-5">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col" colSpan="5" className="text-center">
                                Báo Cáo Doanh Thu Theo Loại Phòng
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
                                Loại Phòng
                            </th>
                            <th scope="col" className="text-center">
                                Doanh Thu(VND)
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
                            data.reportByRoomType.map((item, index) => (
                                <tr key={item._id}>
                                    <th className="text-center" scope="row">
                                        {index + 1}
                                    </th>
                                    <th className="text-center">{item.roomTypeName}</th>
                                    <th className="text-center">
                                        <FormatPrice>{item.totalRevenue}</FormatPrice>
                                    </th>
                                    <th className="text-center">
                                        {data.totalRevenue !== 0
                                            ? (item.totalRevenue / data.totalRevenue).toFixed(2)
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

export default Revenue;
