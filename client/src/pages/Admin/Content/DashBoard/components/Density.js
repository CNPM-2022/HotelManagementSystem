import _ from 'lodash';

function Density({ title, dataReport, isLoading }) {
    return (
        <>
            <div className="admin-density-container mt-5">
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
                                Phòng
                            </th>
                            <th scope="col" className="text-center">
                                Số Ngày Thuê
                            </th>
                            <th scope="col" className="text-center">
                                Tỷ Lệ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!_.isEmpty(dataReport) &&
                            !isLoading &&
                            dataReport.roomUsageDensityReport.map((item, index) => (
                                <tr key={item._id}>
                                    <th className="text-center" scope="row">
                                        {index + 1}
                                    </th>
                                    <th className="text-center">{item.roomNumber}</th>
                                    <th className="text-center">{item.totalRentDays}</th>
                                    <th className="text-center">
                                        {dataReport.totalRentDays !== 0
                                            ? (item.totalRentDays / dataReport.totalRentDays).toFixed(2)
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

export default Density;
