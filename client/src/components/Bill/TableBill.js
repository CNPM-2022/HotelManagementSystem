import { useEffect, useState } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import FormatPrice from '../FormatPrice/FormatPrice';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSort } from 'react-icons/fa';

function TableBill({ role, listBills, setIsShowModalViewBill, setDataBillView }) {
    const ITEMS_PER_PAGE = 6;

    const sortOptions = [
        {
            label: 'Tăng dần',
            value: 'asc',
        },
        {
            label: 'Giảm dần',
            value: 'desc',
        },
    ];

    const initSortCheckedState = sortOptions.reduce((result, sortOption) => {
        result[sortOption.value] = false;
        return { ...result };
    }, {});

    const [chunkedBills, setChunkedBills] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [sortChecked, setSortChecked] = useState(initSortCheckedState);

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (listBills && listBills.length > 0) {
            setPageCount(Math.ceil(listBills.length / ITEMS_PER_PAGE));
            setChunkedBills(_.chunk(listBills, ITEMS_PER_PAGE));
        }
    }, [listBills]);

    const calcDateDiff = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

    const handleClickViewButton = (bill) => {
        setIsShowModalViewBill(true);
        setDataBillView(bill);
    };

    const handleSearchBills = () => {
        let bills = _.clone(listBills);
        if (bills.length === 0) return;

        if (searchValue) {
            bills = listBills.filter((bill) => {
                if (role === 'ADMIN' && bill?.customer?.name) {
                    return (
                        bill.roomNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
                        bill.customer.name.toLowerCase().includes(searchValue.toLowerCase())
                    );
                } else {
                    return bill.roomNumber.toLowerCase().includes(searchValue.toLowerCase());
                }
            });
        }

        let allSortCheckedOrNotChecked =
            Object.keys(sortChecked).every((key) => sortChecked[key] === true) ||
            Object.keys(sortChecked).every((key) => sortChecked[key] === false);

        if (allSortCheckedOrNotChecked === true) {
            setCurrentPage(1);
            setPageCount(Math.ceil(bills.length / ITEMS_PER_PAGE));
            setChunkedBills(_.chunk(bills, ITEMS_PER_PAGE));
        } else {
            let sortValue = '';
            Object.keys(sortChecked).forEach((key) => {
                if (sortChecked[key] === true) sortValue = key;
            });

            const data = _.orderBy(bills, ['totalAmount'], [sortValue]);

            setCurrentPage(1);
            setPageCount(Math.ceil(data.length / ITEMS_PER_PAGE));
            setChunkedBills(_.chunk(data, ITEMS_PER_PAGE));
        }
    };

    const handleClearFiltered = () => {
        setSearchValue('');
        setSortChecked(initSortCheckedState);
    };

    return (
        <>
            <div className="mb-2">
                <div className="col-md-4 mb-2">
                    <label className="form-label">
                        <b>
                            <AiOutlineSearch />
                            <span className="mx-1" />
                            Tìm kiếm
                        </b>
                    </label>
                    <input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="form-control"
                        placeholder={role === 'ADMIN' ? 'Nhập số phòng/tên khách hàng...' : 'Nhập số phòng...'}
                    />
                </div>
                <div>
                    <label className="form-label">
                        <b>
                            <FaSort />
                            <span className="mx-1" />
                            Thành tiền
                        </b>
                    </label>
                    <div>
                        {sortOptions.map((sortOption) => (
                            <div key={sortOption.value}>
                                <input
                                    checked={sortChecked[sortOption.value]}
                                    onChange={(event) =>
                                        setSortChecked((prev) => ({
                                            ...prev,
                                            [sortOption.value]: event.target.checked,
                                        }))
                                    }
                                    id={`sort-bill-${sortOption.value}`}
                                    type="checkbox"
                                />
                                <span className="mx-1" />
                                <label htmlFor={`sort-bill-${sortOption.value}`} className="form-label">
                                    {sortOption.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleSearchBills}>
                    <AiOutlineSearch />
                    Tìm kiếm
                </button>
                {(searchValue || Object.keys(sortChecked).some((key) => sortChecked[key] === true)) && (
                    <button className="btn btn-link" onClick={handleClearFiltered}>
                        Xóa tất cả
                    </button>
                )}
            </div>
            <h4 className="text-center mt-5">Danh sách Đặt phòng</h4>

            <table className="table table-hover">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">STT</th>
                        <th scope="col">Phòng</th>
                        {role === 'ADMIN' && <th scope="col">Khách Hàng</th>}
                        <th scope="col">Số Ngày Thuê</th>
                        <th scope="col">Đơn Giá</th>
                        <th scope="col">Thành Tiền</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {chunkedBills && chunkedBills.length > 0 ? (
                        chunkedBills[currentPage - 1].map((bill, index) => (
                            <tr key={bill._id}>
                                <th scope="row">{ITEMS_PER_PAGE * (currentPage - 1) + (index + 1)}</th>
                                <td>{bill.roomNumber}</td>
                                {role === 'ADMIN' && <td>{bill?.customer?.name}</td>}
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
                            <td colSpan={role === 'ADMIN' ? '7' : '6'} className="text-center">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                {chunkedBills && chunkedBills.length > 0 && (
                    <ReactPaginate
                        className="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        breakLabel="..."
                        nextLabel={'Sau >'}
                        onPageChange={(event) => setCurrentPage(+event.selected + 1)}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel={'< Trước'}
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                )}
            </div>
        </>
    );
}

export default TableBill;
