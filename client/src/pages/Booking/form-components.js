
//import { useEffect, useReducer, useState } from 'react';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Input, MaskedTextBox, NumericTextBox, Checkbox, ColorPicker, Switch, RadioGroup, Slider, SliderLabel, RangeSlider, TextArea, Rating } from '@progress/kendo-react-inputs';
import { DatePicker, TimePicker, DateTimePicker, DateRangePicker, DateInput } from '@progress/kendo-react-dateinputs';
import { Label, Error, Hint, FloatingLabel } from '@progress/kendo-react-labels';
import { Upload } from '@progress/kendo-react-upload';
import { DropDownList, AutoComplete, MultiSelect, ComboBox, MultiColumnComboBox, DropDownTree } from '@progress/kendo-react-dropdowns';
import { processTreeData, expandedState } from './tree-data-operations';
import DateRange from '../../components/DateRange/DateRange';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from "react-redux"
import { Field } from '@progress/kendo-react-form';
import { nameValidator, emailValidator, passwordValidator, requiredValidator } from './validators';
import { getUser } from '../../services/apiServices';


let array2 = []
let pre = '-1'
let test1 = ''
const typeUser = [{
    label: 'Nước ngoài',
    value: 'Foreign'
}, {
    label: 'Nội địa',
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
            <div className='mb-3'><Field key={'dateRent'} id={'dateRent'} name={'dateRent'} label={''} component={FormDateRangePicker} validator={requiredValidator} /></div>
            <div className='mb-3'><Field key={'amountCustomer'} id={'amountCustomer'} name={'amountCustomer'} component={DropDownList} label={<b>Số người ở cùng</b>} data={array} value={test} onChange={e => setTest(e.target.value)} /></div>


            {array2.map(item => (
                <div className='mb-3'>
                    <Label key={'label' + item.toString()} className='m-0' editorId={item.toString()} ><b>{'Thông tin người thứ ' + item.toString()}</b></Label>
                    <Field key={item} id={item.toString()} name={item.toString()} label={"Họ và tên "} component={FormInput} validator={nameValidator} />
                    <Field key={"type" + item.toString()} id={'type' + item.toString()} name={'type' + item.toString()} label={'Loại khách'} layout={'horizontal'} component={FormRadioGroup} data={typeUser} validator={requiredValidator} />
                </div>

            ))}
        </>

    )
}

export const ConfirmInfor = () => {


    return (
        <div>hihi</div>
    )
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
export const FormNumericTextBox = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        <Label editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
        <NumericTextBox ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormCheckbox = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        id,
        valid,
        disabled,
        hint,
        optional,
        label,
        visited,
        modified,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        <Checkbox ariaDescribedBy={`${hintId} ${errorId}`} label={label} labelOptional={optional} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormSwitch = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        optional,
        id,
        valid,
        disabled,
        hint,
        ...others
    } = fieldRenderProps;
    const editorRef = useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>
            {label}
        </Label>
        <Switch ref={editorRef} ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormMaskedTextBox = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        optional,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
        <div className={'k-form-field-wrap'}>
            <MaskedTextBox ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} {...others} />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
    </FieldWrapper>;
};
export const FormTextArea = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        disabled,
        optional,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
        <TextArea valid={valid} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormColorPicker = fieldRenderProps => {
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
        <ColorPicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormSlider = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        data,
        min,
        max,
        ...others
    } = fieldRenderProps;
    const editorRef = useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <Slider ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} min={min} max={max} {...others}>
            {data.map(value => <SliderLabel title={value} key={value} position={value}>
                {value.toString()}
            </SliderLabel>)}
        </Slider>
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormRangeSlider = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        disabled,
        data,
        min,
        max,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        <Label editorId={id} editorValid={valid}>{label}</Label>
        <RangeSlider valid={valid} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} min={min} max={max} {...others}>{data.map(value => {
            return <SliderLabel key={value} position={value}>
                {value.toString()}
            </SliderLabel>;
        })}
        </RangeSlider>
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormRating = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        disabled,
        optional,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
        <Rating valid={valid} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormUpload = fieldRenderProps => {
    const {
        value,
        id,
        optional,
        label,
        hint,
        validationMessage,
        touched,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    const onChangeHandler = event => {
        fieldRenderProps.onChange({
            value: event.newState
        });
    };
    const onRemoveHandler = event => {
        fieldRenderProps.onChange({
            value: event.newState
        });
    };
    return <FieldWrapper>
        <Label id={labelId} editorId={id} optional={optional}>
            {label}
        </Label>
        <Upload id={id} autoUpload={false} showActionButtons={false} multiple={false} files={value} onAdd={onChangeHandler} onRemove={onRemoveHandler} ariaDescribedBy={`${hintId} ${errorId}`} ariaLabelledBy={labelId} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormDropDownList = fieldRenderProps => {
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
        <DropDownList ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormAutoComplete = fieldRenderProps => {
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
        <AutoComplete ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormComboBox = fieldRenderProps => {
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
        <ComboBox ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormMultiColumnComboBox = fieldRenderProps => {
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
    const columns = [{
        field: 'id',
        header: <span>header</span>,
        width: '100px'
    }, {
        field: 'name',
        header: 'Name',
        width: '300px'
    }, {
        field: 'position',
        header: 'Position',
        width: '300px'
    }];
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <MultiColumnComboBox ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} columns={columns} textField={'name'} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormMultiSelect = fieldRenderProps => {
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
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <MultiSelect ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormDropDownTree = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        data,
        ...others
    } = fieldRenderProps;
    const {
        value,
        selectField,
        expandField,
        dataItemKey,
        filter
    } = others;
    const [expanded, setExpanded] = useState([data[0][dataItemKey]]);
    const treeData = useMemo(() => processTreeData(data, {
        expanded,
        value,
        filter
    }, {
        selectField,
        expandField,
        dataItemKey,
        subItemsField: 'items'
    }), [data, expanded, value, filter, selectField, expandField, dataItemKey]);
    const onExpandChange = useCallback(event => setExpanded(expandedState(event.item, dataItemKey, expanded)), [expanded, dataItemKey]);
    const editorRef = useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <DropDownTree ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} data={treeData} onExpandChange={onExpandChange} dataItemKey={others.dataItemKey} textField={others.textField} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormDatePicker = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        hintDirection,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <div className={'k-form-field-wrap'}>
            <DatePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
            {showHint && <Hint id={hintId} direction={hintDirection}>{hint}</Hint>}
            {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
    </FieldWrapper>;
};
export const FormDateTimePicker = fieldRenderProps => {
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
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <DateTimePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormTimePicker = fieldRenderProps => {
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
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <TimePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};
export const FormDateInput = fieldRenderProps => {
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
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
            {label}
        </Label>
        <DateInput ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
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
export const FormFloatingNumericTextBox = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        optional,
        value,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return <FieldWrapper>
        <FloatingLabel optional={optional} editorValue={value} editorId={id} editorValid={valid} editorDisabled={disabled} label={label}>
            <NumericTextBox ariaDescribedBy={`${hintId} ${errorId}`} value={value} valid={valid} id={id} disabled={disabled} {...others} />
        </FloatingLabel>
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>;
};