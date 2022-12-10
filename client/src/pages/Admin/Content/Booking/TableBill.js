import FormatPrice from '../../../../components/FormatPrice/FormatPrice';

function TableBill({ listBills, setIsShowModalViewBill, setDataBillView }) {
    const calcDateDiff = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

    const handleClickViewButton = (bill) => {
        setIsShowModalViewBill(true);
        setDataBillView(bill);
    };
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">STT</th>
                        <th scope="col">Phòng</th>
                        <th scope="col">Số Ngày Thuê</th>
                        <th scope="col">Đơn Giá</th>
                        <th scope="col">Thành Tiền</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {listBills && listBills.length > 0 ? (
                        listBills.map((bill, index) => (
                            <tr key={bill._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{bill.roomNumber}</td>
                                <td>{calcDateDiff(new Date(bill.checkInDate), new Date(bill.checkOutDate))}</td>
                                <td>
                                    <FormatPrice>{bill.roomPrice}</FormatPrice>
                                </td>
                                <td>
                                    <FormatPrice>{bill.totalAmount}</FormatPrice>
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleClickViewButton(bill)}>
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                NO DATA
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TableBill;
