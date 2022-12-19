import { useRef } from 'react';
import { DateRange } from 'react-date-range';
import * as rdrLocales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AiFillCalendar } from 'react-icons/ai';
import useClickOutside from '../../hooks/useClickOutside';

import './DateRange.scss';

function BookingDateRange({ dateRange, handleChangeDateRange, isShowDateRange, setIsShowDateRange }) {
    const ref = useRef(null);
    useClickOutside(ref, () => setIsShowDateRange(false));

    // Format date
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    };

    const formatDate = (date) => {
        return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
    };

    return (
        <div className="date-range-container" ref={ref}>
            <div className="form-control date-content" onClick={() => setIsShowDateRange((prev) => !prev)}>
                <span className="calendar">
                    <AiFillCalendar />
                </span>
                {dateRange[0]?.startDate && dateRange[0]?.endDate ? (
                    <span className="text">
                        {formatDate(dateRange[0].startDate)} - {formatDate(dateRange[0].endDate)}
                    </span>
                ) : (
                    <span>Chọn ngày nhận/trả phòng</span>
                )}
            </div>
            {isShowDateRange && (
                <div>
                    <DateRange
                        locale={rdrLocales.vi}
                        editableDateInputs={true}
                        onChange={handleChangeDateRange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        minDate={new Date()}
                        startDatePlaceholder="Check-in date"
                        endDatePlaceholder="Check-out date"
                    />
                </div>
            )}
        </div>
    );
}

export default BookingDateRange;
