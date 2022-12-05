import { useEffect, useReducer, useState } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';
import { getAllRooms, postCreateBooking } from '../../../../services/apiServices';

import DateRange from '../../../../components/DateRange/DateRange';
import reducer, { initState } from './customerReducer/reducer';
import logger from './customerReducer/logger';
import {
    addCustomer,
    deleteCustomer,
    setCustomerAddress,
    setCustomerName,
    setCustomerIdentity,
    setCustomerType,
    setCustomers,
} from './customerReducer/actions';

function ManageBooking() {
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

    const statusOptions = [
        {
            label: 'Đã thanh toán',
            value: 'Paid',
        },
        {
            label: 'Chưa thanh toán',
            value: 'Pending',
        },
    ];

    const [room, setRoom] = useState({});
    const [roomOptions, setRoomOptions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [status, setStatus] = useState(statusOptions[0].value);
    const [dateRange, setDateRange] = useState(initalDateRange);
    const [isShowDateRange, setIsShowDateRange] = useState(false);

    const [customersState, dispatch] = useReducer(logger(reducer), initState);

    useEffect(() => {
        fetchAllRooms();
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

    const handleChangeDateRange = (item) => setDateRange([item.selection]);

    const handleSelectCustomerType = (customer, selected) => {
        if (selected.value !== customer.type) {
            dispatch(setCustomerType({ id: customer.id, type: selected.value }));
        }
    };

    const handleSelectRoom = (selected) => {
        if (room && room._id !== selected.value._id) {
            setRoom(selected.value);
        }
    };

    const handleSelectStatus = (selected) => {
        if (status && status !== selected.value) {
            setStatus(selected.value);
        }
    };

    const handleBooking = async () => {
        console.log('room: ', room);
        console.log('dateRange: ', dateRange);
        console.log('customersState: ', customersState);
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

        if (isNaN(+totalAmount) || +totalAmount < 0) {
            toast.error('Giá tiền không hợp lệ!');
            isValid = false;
        }

        if (!status) {
            toast.error('Chọn trạng thái phòng!');
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
            checkInDate: dateRange[0].startDate,
            checkOutDate: dateRange[0].endDate,
            status,
            totalAmount: +totalAmount,
            customerList,
        };
        const res = await postCreateBooking(data);

        if (res && res.data && res.data.success === true) {
            setRoom({});
            setTotalAmount(0);
            setDateRange(initalDateRange);
            dispatch(setCustomers(initState));

            toast.success(res.data.message);
        } else {
            toast.error(res.message);
        }
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
                            <Select options={roomOptions} onChange={handleSelectRoom} />
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
                    <div className="col-6 mb-3">
                        <div className="form-group mb-3">
                            <label className="form-label">
                                <b>Tổng tiền:</b>
                            </label>
                            <input
                                value={totalAmount}
                                onChange={(event) => setTotalAmount(event.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <div className="form-group mb-3">
                            <label className="form-label">
                                <b>Trạng thái:</b>
                            </label>
                            <Select
                                defaultValue={statusOptions[0]}
                                options={statusOptions}
                                onChange={handleSelectStatus}
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
                                                <div
                                                    onClick={() => dispatch(addCustomer())}
                                                    className="manage-customer-icon add-customer-icon"
                                                >
                                                    <BiPlusCircle />
                                                </div>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-success" onClick={handleBooking}>
                    Đặt phòng
                </button>
            </div>
        </>
    );
}

export default ManageBooking;
