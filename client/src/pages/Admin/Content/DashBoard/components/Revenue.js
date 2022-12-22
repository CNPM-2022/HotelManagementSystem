import _ from 'lodash';
import FormatPrice from '../../../../../components/FormatPrice/FormatPrice';

function Revenue({ title, dataReport, isLoading }) {
    return (
        <>
            <div className="admin-revenue-container mt-5">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col" colSpan="5" className="text-center">
                                {title}
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="text-center" colSpan="5">
                                {_.isEmpty(dataReport) ? 'Tháng ...' : `Tháng ${dataReport.month}/${dataReport.year}`}
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
                                Tỷ Lệ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!_.isEmpty(dataReport) &&
                            !isLoading &&
                            dataReport.reportByRoomType.map((item, index) => (
                                <tr key={item._id}>
                                    <th className="text-center" scope="row">
                                        {index + 1}
                                    </th>
                                    <th className="text-center">{item.roomTypeName}</th>
                                    <th className="text-center">
                                        <FormatPrice>{item.totalRevenue}</FormatPrice>
                                    </th>
                                    <th className="text-center">
                                        {dataReport.totalRevenue !== 0
                                            ? (item.totalRevenue / dataReport.totalRevenue).toFixed(2)
                                            : 0}
                                    </th>
                                </tr>
                            ))}
                        {!_.isEmpty(dataReport) && isLoading && (
                            <tr>
                                <th colSpan="4" className="text-center" scope="row">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </th>
                            </tr>
                        )}

                        {_.isEmpty(dataReport) && (
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
