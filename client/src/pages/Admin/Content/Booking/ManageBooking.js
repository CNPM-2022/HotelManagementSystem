import { useEffect, useMemo, useReducer, useState } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { BiPlusCircle, BiMinusCircle, BiRefresh } from 'react-icons/bi';
import { HiChevronDoubleDown } from 'react-icons/hi';

import { getAllRooms, getRegulations, postCreateBill } from '../../../../services/apiServices';
import DateRange from '../../../../components/DateRange/DateRange';
import reducer, { initState } from './customerReducer/reducer';
import {
    addCustomer,
    deleteCustomer,
    setCustomerAddress,
    setCustomerName,
    setCustomerIdentity,
    setCustomerType,
    setCustomers,
} from './customerReducer/actions';
import Bill from '../../../../components/Bill/Bill';
import FormatPrice from '../../../../components/FormatPrice/FormatPrice';

function ManageBooking({ fetchAllBills }) {
    const initalDateRange = [
        {
            startDate: null,
            endDate: null,
            key: 'selection',
        },
    ];

    const typeOptions = [
        {
            label: 'Việt Nam',
            value: 'Inland',
        },
        {
            label: 'Nước ngoài',
            value: 'Foreign',
        },
    ];

    const [room, setRoom] = useState({});
    const [roomOptions, setRoomOptions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [dateRange, setDateRange] = useState(initalDateRange);
    const [isShowDateRange, setIsShowDateRange] = useState(false);

    const [customersState, dispatch] = useReducer(reducer, initState);
    const [regulations, setRegulations] = useState({});
    const [billData, setBillData] = useState({});

    useEffect(() => {
        fetchAllRooms();
        fetchRegulations();
    }, []);

    const fetchAllRooms = async () => {
        const res = await getAllRooms();

        if (res && res.data && res.data.success === true) {
            setRoomOptions(
                res.data.data.map((item) => ({
                    label: `Phòng ${item.roomNumber} - Loại ${item.type} - Giá ${item.price}`,
                    value: item,
                })),
            );
        }
    };

    const fetchRegulations = async () => {
        const res = await getRegulations();

        if (res && res.data && res.data.success === true) {
            setRegulations(res.data.law[0]);
        }
    };

    const calcDateDiff = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const dateDiff = useMemo(() => {
        if (dateRange[0].endDate && dateRange[0].startDate) {
            return calcDateDiff(dateRange[0].startDate, dateRange[0].endDate);
        }

        return 1;
    }, [dateRange]);

    useEffect(() => {
        if (_.isEmpty(room)) {
            setTotalAmount(0);
            return;
        }

        let total = 0;

        total = dateDiff * room.price;

        if (customersState.length >= 3) total += total * regulations.phuThu;

        if (customersState.find((customer) => customer.type === 'Foreign')) total *= regulations.heSo;

        setTotalAmount(total);
    }, [room, dateDiff, customersState]);

    const handleChangeDateRange = (item) => {
        setDateRange([item.selection]);
    };

    const handleSelectCustomerType = (customer, selected) => {
        if (selected.value !== customer.type) {
            dispatch(setCustomerType({ id: customer.id, type: selected.value }));
        }
    };

    const handleSelectRoom = (selected) => {
        if (room._id !== selected.value._id) {
            setRoom(selected.value);
        }
    };

    const handleBooking = async () => {
        // Validate
        let isValid = true;
        if (_.isEmpty(room)) {
            toast.error('Chọn phòng muốn đặt!');
            isValid = false;
        }

        if (!dateRange[0]?.startDate || !dateRange[0]?.endDate) {
            toast.error('Chọn ngày nhận/trả phòng!');
            isValid = false;
        }

        let isValidCustomers = true;

        for (let i = 0; i < customersState.length; i++) {
            if (
                !customersState[i].name ||
                !customersState[i].identity ||
                !customersState[i].type ||
                !customersState[i].address
            ) {
                toast.error(`Vui lòng điền đầy đủ thông tin khách hàng ${i + 1}!`);
                isValidCustomers = false;
            }
        }

        if (isValidCustomers === false) {
            isValid = false;
        }

        if (isValid === false) return;

        const customerList = customersState.map((customer) => ({
            name: customer.name,
            address: customer.address,
            typeUser: customer.type,
            CMND: customer.identity,
        }));

        const data = {
            roomId: room._id,
            checkInDate: addDays(dateRange[0].startDate, 1),
            checkOutDate: addDays(dateRange[0].endDate, 1),
            totalAmount,
            customerList,
            dateOfPayment: new Date(),
            address: customerList[0].address,
        };
        const res = await postCreateBill(data);

        if (res && res.data && res.data.success === true) {
            data.roomNumber = room.roomNumber;
            data.roomPrice = room.price;
            data.dateDiff = dateDiff;
            data.customer = customerList[0];
            setBillData(data);
            fetchAllBills();
            toast.success(res.data.message);
        } else {
            toast.error(res.message);
        }
    };

    const handleReset = () => {
        setBillData({});
        setRoom({});
        setTotalAmount(0);
        setDateRange(initalDateRange);
        dispatch(setCustomers(initState));
        toast.success('Làm mới thành công!');
    };

    return (
        <>
            <div className="manage-booking-content py-3">
                <h4 className="manage-booking-title">Phiếu đặt phòng</h4>
                <div className="row">
                    <div className="col-6 mb-3">
                        <div className="form-group mb-3">
                            <label className="form-label">
                                <b>Chọn phòng:</b>
                            </label>
                            <Select
                                value={
                                    (room && roomOptions.find((roomOption) => roomOption.value._id === room._id)) || {}
                                }
                                options={roomOptions}
                                onChange={handleSelectRoom}
                            />
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-group">
                            <label className="form-label">
                                <b>Chọn ngày nhận/trả phòng:</b>
                            </label>
                            <DateRange
                                handleChangeDateRange={handleChangeDateRange}
                                dateRange={dateRange}
                                isShowDateRange={isShowDateRange}
                                setIsShowDateRange={setIsShowDateRange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group mb-3">
                            <label className="form-label">
                                <b>Danh sách Khách hàng:</b>
                            </label>
                            <div className="customers">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="table-dark">
                                            <th scope="col">
                                                {room && customersState.length < room.maxCount && (
                                                    <div
                                                        onClick={() => dispatch(addCustomer())}
                                                        className="manage-customer-icon add-customer-icon"
                                                    >
                                                        <BiPlusCircle />
                                                    </div>
                                                )}
                                                STT
                                            </th>
                                            <th scope="col">Họ và tên</th>
                                            <th scope="col">CMND/CCCD</th>
                                            <th scope="col">Loại</th>
                                            <th scope="col">Địa chỉ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customersState &&
                                            customersState.length > 0 &&
                                            customersState.map((customer, index) => (
                                                <tr key={customer.id}>
                                                    <th scope="row">
                                                        {customersState.length > 1 && (
                                                            <div
                                                                onClick={() =>
                                                                    dispatch(deleteCustomer({ id: customer.id }))
                                                                }
                                                                className="manage-customer-icon delete-customer-icon"
                                                            >
                                                                <BiMinusCircle />
                                                            </div>
                                                        )}
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        <input
                                                            value={customer.name}
                                                            onChange={(event) =>
                                                                dispatch(
                                                                    setCustomerName({
                                                                        id: customer.id,
                                                                        name: event.target.value,
                                                                    }),
                                                                )
                                                            }
                                                            className="form-control"
                                                            placeholder="..."
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            value={customer.identity}
                                                            onChange={(event) =>
                                                                dispatch(
                                                                    setCustomerIdentity({
                                                                        id: customer.id,
                                                                        identity: event.target.value,
                                                                    }),
                                                                )
                                                            }
                                                            className="form-control"
                                                            placeholder="..."
                                                        />
                                                    </td>
                                                    <td>
                                                        <Select
                                                            defaultValue={typeOptions[0]}
                                                            options={typeOptions}
                                                            onChange={(selected) =>
                                                                handleSelectCustomerType(customer, selected)
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            value={customer.address}
                                                            onChange={(event) =>
                                                                dispatch(
                                                                    setCustomerAddress({
                                                                        id: customer.id,
                                                                        address: event.target.value,
                                                                    }),
                                                                )
                                                            }
                                                            className="form-control"
                                                            placeholder="..."
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        <tr>
                                            <td colSpan="5">
                                                <div className="total-price">
                                                    <b>Tổng tiền:</b>
                                                    <b>
                                                        <FormatPrice>{totalAmount}</FormatPrice> VND
                                                    </b>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-success" onClick={handleBooking}>
                        Đặt phòng
                    </button>

                    <button className="btn btn-primary" onClick={handleReset}>
                        <i>
                            <BiRefresh />
                        </i>
                        Làm mới
                    </button>
                </div>
            </div>

            {!_.isEmpty(billData) && (
                <>
                    <div className="down-icon">
                        <i>
                            <HiChevronDoubleDown />
                        </i>
                    </div>

                    <Bill billData={billData} />
                </>
            )}
        </>
    );
}

export default ManageBooking;
