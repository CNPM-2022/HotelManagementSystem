import * as React from 'react';
import * as ReactDOM from 'react-dom';
import _ from 'lodash';
import { Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';
import { PersonalDetails } from './confirmInfor';
import { PaymentDetails } from './payment-details';
import { useDispatch } from "react-redux"
import { FormInputInfor, ConfirmInfor } from './form-components';
import bookingSlice from '../../store/bookingSlice';
import './Booking.scss'


const inputInfor = <div><FormInputInfor /></div>;
const confirmInfor = <div><ConfirmInfor /></div>
const stepPages = [inputInfor, confirmInfor, PaymentDetails];




const BookingScreen = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (step === 0) {
            document.querySelectorAll(".k-floating-label-container")[0].childNodes[1].innerHTML = "<b>Ngày nhận phòng</b>"
            document.querySelectorAll(".k-floating-label-container")[1].childNodes[1].innerHTML = "<b>Ngày trả phòng</b>"
        }
    })

    const [step, setStep] = React.useState(0);
    const [formState, setFormState] = React.useState({});
    const [steps, setSteps] = React.useState([{
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
    const onStepSubmit = React.useCallback(event => {
        const {
            isValid,
            values
        } = event;
        const currentSteps = steps.map((currentStep, index) => ({
            ...currentStep,
            isValid: index === step ? isValid : currentStep.isValid
        }));
        setSteps(currentSteps);
        if (!isValid) {
            return;
        }
        setStep(() => Math.min(step + 1, lastStepIndex));
        setFormState(values);
        if (step === 0) {
            const start = values.dateRent.start.toString()
            const end = values.dateRent.end.toString()
            const bookingInfor = {
                'listCustomer': [],
                'dateRentStart': start,
                'dateRentEnd': end,
                'amountCustomer': values.amountCustomer
            }
            for (let i = 1; i <= values.amountCustomer; i++) {
                bookingInfor.listCustomer.push(_.pick(values, [i.toString(), 'type' + i.toString()]))
            }
            dispatch(
                bookingSlice.actions.setBookingInformation(
                    {
                        bookingInformation: bookingInfor
                    }
                )
            )
        }
        if (step === 1) {
            console.log(values)
        }
        if (isLastStep) {
            alert(JSON.stringify(values));
            console.log(values)
        }
    }, [steps, isLastStep, step, lastStepIndex]);
    const onPrevClick = React.useCallback(event => {
        event.preventDefault();
        setStep(() => Math.max(step - 1, 0));
    }, [step, setStep]);
    return (
        <div className='mb-5' style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }} >
            <Stepper value={step} items={steps} />
            <Form initialValues={formState} onSubmitClick={onStepSubmit} render={formRenderProps => <div style={{
                alignSelf: 'center'
            }}>
                <FormElement style={{
                    width: 480
                }}>
                    {/* < FormInputInfor /> */} {stepPages[step]}
                    <span style={{
                        marginTop: '40px'
                    }} className={'k-form-separator'} />
                    <div style={{
                        justifyContent: 'space-between',
                        alignContent: 'center'
                    }} className={'k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end'}>
                        <span style={{
                            alignSelf: 'center'
                        }}>Step {step + 1} of 3</span>
                        <div>
                            {step !== 0 ? <Button style={{
                                marginRight: '16px'
                            }} onClick={onPrevClick}>
                                Previous
                            </Button> : undefined}
                            <Button themeColor={'primary'} disabled={!formRenderProps.allowSubmit} onClick={formRenderProps.onSubmit}>
                                {isLastStep ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </FormElement>
            </div>} />
        </div>
    );
};


export default BookingScreen;
