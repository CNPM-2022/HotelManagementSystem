
import { FieldWrapper, Field } from '@progress/kendo-react-form';
import { Input, RadioGroup } from '@progress/kendo-react-inputs';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { nameValidator, requiredValidator, dateValidator } from './validators';
import { getUser, getRule } from '../../services/apiServices';
import bookingSlice from '../../store/bookingSlice';
import { postCreateBill } from '../../services/apiServices';
import { useParams } from 'react-router-dom';

const getDayName = (current_day) => {
    var day_name = '';

    switch (current_day) {
        case 0:
            day_name = "Chủ nhật";
            break;
        case 1:
            day_name = "Thứ hai";
            break;
        case 2:
            day_name = "Thứ ba";
            break;
        case 3:
            day_name = "Thứ tư";
            break;
        case 4:
            day_name = "Thứ năm";
            break;
        case 5:
            day_name = "Thứ sáu";
            break;
        case 6:
            day_name = "Thứ bảy";
            break
        default:
            console.log('lỗi')
    }
    return day_name
}

let array2 = []
let pre = '-1'
let test1 = ''
const typeUser = [{
    label: 'Nước ngoài',
    value: 'Foreign'
}, {
    label: 'Trong nước',
    value: 'Inland'
}]
export const FormInputInfor = () => {
    let array = []
    const [test, setTest] = useState(test1)
    const bookingInfor = useSelector(state => state.booking)
    for (let i = 0; i < bookingInfor.maxPeopel; i++) {
        array.push(i)
    }
    if (test !== pre) {
        array2 = []
        for (let i = 1; i <= test; i++) {
            array2.push(i)
        }
    }
    test1 = test
    pre = test
    return (
        <>
            <div className='mb-3'><Field key={'dateRent'} id={'dateRent'} name={'dateRent'} label={''} component={FormDateRangePicker} validator={dateValidator} /></div>
            <div className='mb-3'><Field key={'amountCustomer'} id={'amountCustomer'} name={'amountCustomer'} component={DropDownList} label={<b>Số người ở cùng</b>} data={array} value={test} onChange={e => setTest(e.target.value)} /></div>


            {array2.map(item => (
                <div className='mb-3' key={"input" + item.toString()}>
                    <Label key={'label' + item.toString()} className='m-0' editorId={item.toString()} ><b>{'Thông tin người thứ ' + item.toString()}</b></Label>
                    <Field key={item} id={item.toString()} name={item.toString()} label={"Họ và tên "} component={FormInput} validator={nameValidator} />
                    <Field key={"type" + item.toString()} id={'type' + item.toString()} name={'type' + item.toString()} label={'Loại khách'} layout={'horizontal'} component={FormRadioGroup} data={typeUser} validator={requiredValidator} />
                </div>

            ))}
        </>

    )
}

export const ConfirmInfor = () => {

    const dispatch = useDispatch()
    const bookingInfor = useSelector(state => state.booking)
    const dateRentStart = new Date(bookingInfor.bookingInformation.dateRentStart)
    const dateRentEnd = new Date(bookingInfor.bookingInformation.dateRentEnd)
    const [infor, setInfor] = useState({});
    const [rule, setRule] = useState({})
    const getInforUser = async () => {
        const res = await getUser(JSON.parse(window.localStorage.getItem('user')).id);
        dispatch(
            bookingSlice.actions.setOwner(
                {
                    owner: { 'name': res.data.user.Name, 'typeUser': res.data.user.typeUser, 'CMND': res.data.user.CMND, 'address': res.data.user.address }
                }
            )
        )
        setInfor(res.data);
    };
    const getRuleBooking = async () => {
        const res = await getRule()
        setRule(res.data.law[0])
    }
    useEffect(() => {
        getInforUser();
        getRuleBooking()
    }, []);
    let autoIncrease = 1;
    if (infor.user !== undefined) {
        let totalCost = 0
        let amountDateRent = ((dateRentEnd.getTime() - dateRentStart.getTime()) / 1000) / 86400 + 1;
        //if (amountDateRent === 0) amountDateRent = 1

        if (infor.user.typeUser === 'Foreign' || bookingInfor.bookingInformation.listCustomer.some((element) => element.typeUser === 'Foreign')) {

            if (
                bookingInfor.bookingInformation.listCustomer.length + 1 === bookingInfor.maxPeopel
            ) {
                totalCost = bookingInfor.price * rule.heSo * amountDateRent * (1 + rule.phuThu)
            }
            else {
                totalCost = bookingInfor.price * rule.heSo * amountDateRent
            }
            dispatch(
                bookingSlice.actions.setTotalCost(
                    {
                        totalCost: totalCost
                    }
                )
            )
        }
        else {
            if (
                bookingInfor.bookingInformation.listCustomer.length + 1 === bookingInfor.maxPeopel
            ) {
                totalCost = bookingInfor.price * amountDateRent * (1 + rule.phuThu)
            }
            else {
                totalCost = bookingInfor.price * amountDateRent
            }
            dispatch(
                bookingSlice.actions.setTotalCost(
                    {
                        totalCost: totalCost
                    }
                )
            )
        }


        return (
            <div className='mt-3'>
                <div><b>Người đặt phòng:</b> {infor.user.Name}</div>
                <div><b>Ngày nhận phòng: </b>{getDayName(dateRentStart.getDay())}, ngày {dateRentStart.getDate()}, tháng {dateRentStart.getMonth() + 1}, năm {dateRentStart.getFullYear()}</div>
                <div><b>Ngày trả phòng: </b>{getDayName(dateRentEnd.getDay())}, ngày {dateRentEnd.getDate()}, tháng {dateRentEnd.getMonth() + 1}, năm {dateRentEnd.getFullYear()}</div>
                <div className='mb-3'><b>Số người trong phòng :</b> {bookingInfor.bookingInformation.amountCustomer}</div>
                <table className="table">
                    <thead className='bg-dark text-light'>
                        <tr>
                            <th className='col-1' scope="col">#</th>
                            <th className='col-8' scope="col">Tên</th>
                            <th className='col-3' scope="col">Loại khách</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{infor.user.Name}</td>
                            <td>{infor.user.typeUser === 'Inland' ? "Trong nước" : " Nước ngoài"}</td>
                        </tr>
                        {
                            bookingInfor.bookingInformation.listCustomer.map(item => (
                                <tr key={autoIncrease}>
                                    <th scope="row">{autoIncrease = autoIncrease + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.typeUser === 'Inland' ? "Trong nước" : " Nước ngoài"}</td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
                <div><b>Tổng tiền: {totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</b></div>
            </div>
        )
    }
}

export const FormInput = fieldRenderProps => {

    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        type,
        optional,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        {/* <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label> */}
        <div className={'k-form-field-wrap'}>
            <Input label={label} valid={valid} type={type} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
    </FieldWrapper>;
};
export const FormRadioGroup = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        id,
        label,
        valid,
        disabled,
        hint,
        visited,
        modified,
        ...others
    } = fieldRenderProps;
    const editorRef = useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
        <RadioGroup ariaDescribedBy={`${hintId} ${errorId}`} ariaLabelledBy={labelId} valid={valid} disabled={disabled} ref={editorRef} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};

export const FormDateRangePicker = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        ...others
    } = fieldRenderProps;
    const editorRef = useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <DateRangePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};


export const Bill = () => {
    const bookingInforSlice = useSelector(state => state.booking)
    const [billBooking, setBillBooking] = useState({})
    const params = useParams();

    const ref = useRef();

    useEffect(() => {
        //ref.current.scrollIntoView({ behavior: 'smooth' });
        const data = {
            "roomId": params.id,
            'checkInDate': bookingInforSlice.bookingInformation.dateRentStart,
            "checkOutDate": bookingInforSlice.bookingInformation.dateRentEnd,
            "customerList": bookingInforSlice.owner.concat(bookingInforSlice.bookingInformation.listCustomer),
            'totalAmount': bookingInforSlice.totalCost,
            'status': 'pending',
            'dateOfPayment': new Date().toDateString(),
            'address': bookingInforSlice.owner[0].address,
        };
        postCreateBill(data).then(data => setBillBooking(data.data.newBill))
    }, []);


    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    };

    const formatDate = (date) => {
        return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
    };

    const calcDateDiff = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

    if (billBooking.dateOfPayment !== undefined) {
        return (
            <div ref={ref} className="booking-bill-container mt-3">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col" colSpan="5" className="text-center">
                                Hóa đơn thanh toán
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan="5">
                                <div className="d-flex table-row-header-custom">
                                    <div className="w-50">
                                        Khách hàng/Cơ quan:{' '} {bookingInforSlice.owner[0].name}
                                    </div>
                                    <div className="w-50">Địa chỉ: {bookingInforSlice.owner[0].address}</div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan="5">
                                <div className="d-flex table-row-header-custom">
                                    <div className="w-50">
                                        Ngày thanh toán: {formatDate(new Date(billBooking.dateOfPayment))}
                                    </div>
                                    <div className="w-50">
                                        Trị giá: {bookingInforSlice.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                                    </div>
                                </div>
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
                                Số ngày thuê
                            </th>
                            <th scope="col" className="text-center">
                                Đơn giá
                            </th>
                            <th scope="col" className="text-center">
                                Thành tiền
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="text-center" scope="row">
                                1
                            </th>
                            <th className="text-center">{bookingInforSlice.roomNumber}</th>
                            <th className="text-center">
                                {calcDateDiff(new Date(bookingInforSlice.bookingInformation.dateRentStart), new Date(bookingInforSlice.bookingInformation.dateRentEnd))}
                            </th>
                            <th className="text-center">
                                {bookingInforSlice.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                            </th>
                            <th className="text-center">
                                {bookingInforSlice.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
