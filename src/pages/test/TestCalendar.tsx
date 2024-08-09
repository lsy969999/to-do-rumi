import { useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type DateView = {
    date: Date,
    view: string,// todo change view
}
const getWeekRange = (date: Date) => {
    const startOfWeek = date.getDate() - date.getDay();
    const endOfWeek = startOfWeek + 6;
    const startDate = new Date(date.setDate(startOfWeek));
    const endDate = new Date(date.setDate(endOfWeek));
    return { startDate, endDate };
  };
const TestCalendar = () => {
    const [value, setValue] = useState<Date>(new Date());
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const handleDateChange = (date: any) => {
        console.log(date)
        setValue(date)
    }
    const tileDisabled = ({ date, view }: DateView) => {
        if (view === 'month') {
            const { startDate, endDate } = getWeekRange(value);
            
            return date < startDate || date > endDate;
        }
        return false;
    };

    const formatDay = (_locale: string | undefined, date: Date): string => {
        return date.getDate().toString();
    }

    const tileClassName = ({date, view}: DateView) => {
        if (view === 'month') {
            if (date.getDay() === 6) {
                return 'saturday';
            }
            if (date.getDay() === 0) {
                return 'sunday';
            }
        }
    }

    return (
        <div>
            <nav>TestCalendar</nav>
            <div>
                <Calendar
                    onChange={handleDateChange}
                    value={value}
                    tileDisabled={tileDisabled}
                    tileClassName={tileClassName}
                    formatDay={formatDay}
                    calendarType="gregory"
                />
            </div>
        </div>
    )
}

export default TestCalendar