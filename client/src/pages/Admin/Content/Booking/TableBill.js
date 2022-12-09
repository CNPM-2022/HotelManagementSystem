function TableBill({ listBills }) {
    console.log(listBills);
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
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    {listBills && listBills.length > 0 ? (
                        listBills.map((bill, index) => (
                            <tr key={bill._id}>
                                <th scope="row">{index + 1}</th>
                                <td>''</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
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
