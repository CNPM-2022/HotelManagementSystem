import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { Form, FormElement } from '@progress/kendo-react-form';
import { useParams } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';
import { useDispatch } from 'react-redux';
import { FormInputInfor, ConfirmInfor, Bill } from './formComponents';
import bookingSlice from '../../store/bookingSlice';
import { getRoomById, searchRooms } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Booking.scss';

const inputInfor = (
    <div>
        <FormInputInfor />
    </div>
);
const confirmInfor = (
    <div>
        <ConfirmInfor />
    </div>
);
const bill = (
    <div>
        <Bill />
    </div>
);
const stepPages = [inputInfor, confirmInfor, bill];

const BookingScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [room, setRoom] = useState({});
    const [step, setStep] = useState(0);
    const [formState, setFormState] = useState({});

    const GetDetailRoom = async (roomId) => {
        try {
            const res = await getRoomById(roomId);
            const data = res.data;
            if (res.status !== 200) {
                throw new Error(data.message);
            }
            setRoom(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        if (step === 0) {
            document.querySelectorAll('.k-floating-label-container')[0].childNodes[1].innerHTML =
                '<b>Ngày nhận phòng</b>';
            document.querySelectorAll('.k-floating-label-container')[1].childNodes[1].innerHTML =
                '<b>Ngày trả phòng</b>';
        }
    });
    useEffect(() => {
        if (step === 0) {
            document.querySelectorAll('.k-floating-label-container')[0].childNodes[1].innerHTML =
                '<b>Ngày nhận phòng</b>';
            document.querySelectorAll('.k-floating-label-container')[1].childNodes[1].innerHTML =
                '<b>Ngày trả phòng</b>';
        }
        GetDetailRoom(params.id);
        document.documentElement.scrollTop = 0;
    }, []);
    dispatch(
        bookingSlice.actions.setMaxPeople({
            maxPeopel: room.maxCount,
        }),
    );
    dispatch(
        bookingSlice.actions.setPrice({
            price: room.price,
        }),
    );
    dispatch(
        bookingSlice.actions.setRoomNumber({
            roomNumber: room.roomNumber,
        }),
    );

    const checkDate = async (data) => {
        const res = await searchRooms(data)
        for (const i of res.data.results.results) {
            if (i._id === room._id) {
                return true
            }
        }
        return false
    }
    const [steps, setSteps] = useState([{
        label: 'Nhập thông tin',
        isValid: undefined
    }, {
        label: 'Xác nhận',
        isValid: undefined
    }, {
        label: 'Hóa đơn',
        isValid: undefined
    }]);

    const lastStepIndex = steps.length - 1;
    const isLastStep = lastStepIndex === step;
    const onStepSubmit = useCallback(
        (event) => {
            const { isValid, values } = event;
            const currentSteps = steps.map((currentStep, index) => ({
                ...currentStep,
                isValid: index === step ? isValid : currentStep.isValid,
            }));
            setSteps(currentSteps);
            if (!isValid) {
                return;
            }
            setStep(() => Math.min(step + 1, lastStepIndex));
            setFormState(values);
            if (step === 0) {
                const start = values.dateRent.start.toString();
                const end = values.dateRent.end.toString();
                const bookingInfor = {
                    listCustomer: [],
                    dateRentStart: start,
                    dateRentEnd: end,
                    amountCustomer: 1,
                };
                for (let i = 1; i <= values.amountCustomer; i++) {
                    const tempUser = { name: '', typeUser: '', CMND: '123', address: '123' };
                    tempUser.name = _.at(_.pick(values, [i.toString(), 'type' + i.toString()]), i.toString())[0];
                    tempUser.typeUser = _.at(
                        _.pick(values, [i.toString(), 'type' + i.toString()]),
                        'type' + i.toString(),
                    )[0];
                    bookingInfor.listCustomer.push(tempUser);
                }
                if (values.amountCustomer !== undefined) {
                    bookingInfor.amountCustomer = values.amountCustomer + 1;
                }

                dispatch(
                    bookingSlice.actions.setBookingInformation({
                        bookingInformation: bookingInfor,
                    }),
                );
            }
            if (step === 1) {
                let price;
                if (room.price < 500000) {
                    price = '1';
                }
                if (room.price > 1000000) {
                    price = '2';
                }
                if (room.price <= 1000000 && room.price >= 500000) {
                    price = '3';
                }
                const data = {
                    type: room.type,
                    price: price,
                    rentperDate: values.dateRent.start.toString(),
                    checkOutDate: values.dateRent.end.toString(),
                };
                checkDate(data).then((available) => {
                    if (available) {
                        toast.success('Đặt phòng thành công');
                    } else {
                        toast.error('Ngày bạn đặt đã không còn chỗ');
                        setStep(0);
                    }
                });
            }
            if (isLastStep) {
                navigate('/User/My-Booking');
            }
        },
        [steps, isLastStep, step, lastStepIndex],
    );
    const onPrevClick = useCallback(
        (event) => {
            event.preventDefault();
            setStep(() => Math.max(step - 1, 0));
        },
        [step, setStep],
    );
    return (
        <div className="h-100 booking-container" style={{ backgroundColor: 'rgb(238,238,238)' }}>
            <div className="form-booking-container h-100 my-5">
                <div
                    className="  "
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Stepper value={step} items={steps} />

                    <Form
                        initialValues={formState}
                        onSubmitClick={onStepSubmit}
                        render={(formRenderProps) => (
                            <div className="d-flex justify-content-center booking-form">
                                <FormElement className="form-element">
                                    {stepPages[step]}
                                    <span
                                        style={{
                                            marginTop: '40px',
                                        }}
                                        className={'k-form-separator'}
                                    />
                                    <div
                                        style={{
                                            justifyContent: 'space-between',
                                            alignContent: 'center',
                                        }}
                                        className={
                                            'k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end'
                                        }
                                    >
                                        <span
                                            style={{
                                                alignSelf: 'center',
                                            }}
                                        >
                                            Step {step + 1} of 3
                                        </span>
                                        <div>
                                            {step !== 0 && step !== 2 ? (
                                                <Button
                                                    style={{
                                                        marginRight: '16px',
                                                    }}
                                                    onClick={onPrevClick}
                                                >
                                                    Quay lại
                                                </Button>
                                            ) : undefined}
                                            {step < 2 ? (
                                                <Button
                                                    themeColor={'primary'}
                                                    disabled={!formRenderProps.allowSubmit}
                                                    onClick={formRenderProps.onSubmit}
                                                >
                                                    {step === 1 ? 'Đặt phòng' : 'Tiếp theo'}
                                                </Button>
                                            ) : (
                                                <Button
                                                    themeColor={'primary'}
                                                    disabled={!formRenderProps.allowSubmit}
                                                    onClick={formRenderProps.onSubmit}
                                                >
                                                    Lịch sử đặt phòng
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </FormElement>
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className="infor-room">
                {room._id && (
                    <div className="card" style={{ width: 18 + 'rem' }}>
                        <img
                            src={`http://localhost:5000/${room.imageUrls[0].filePath}`}
                            width={150}
                            height={150}
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body">
                            <h5 className="card-title border-bottom">Phòng #{room.roomNumber}</h5>
                            <div className="room-price">
                                <b>Giá: </b> {room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ{' '}
                                <span>/ Ngày</span>
                            </div>
                            <div>
                                <b>Loại: </b>
                                <span>{room.type}</span>
                            </div>
                            <div>
                                <b>Số lượng: </b>
                                <span>Tối đa {room.maxCount} người</span>
                            </div>
                            <div>
                                <b>Trạng thái: </b>
                                <span>King beds</span>
                            </div>
                            <div>
                                <b>Dịch vụ: </b>
                                <span>{room.note}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingScreen;
