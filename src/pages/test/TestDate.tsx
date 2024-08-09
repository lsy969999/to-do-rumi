import { useState } from "react"
import { addDays, format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, getDay } from 'date-fns'
import {ko, enUS} from 'date-fns/locale'

const locale = window.navigator.language === 'ko-KR' ? ko : enUS


const TestDate = () => {
    const [now, setNow] = useState<Date>(new Date());
    return (
        <div>
            <nav>TestDate</nav>
            <div>
                <div>now: {format(now, 'yyyy-MM-dd HH:mi:ss E', {locale})}</div>
                <div>now + 1day: {format(addDays(now, 1), 'yyyy-MM-dd HH:mi:ss')}</div>
                <div>now - 1day: {format(subDays(now, 1), 'yyyy-MM-dd HH:mi:ss')}</div>
                <div>now start week: {format(startOfWeek(now), 'yyyy-MM-dd HH:mi:ss')}</div>
                <div>now end week: {format(endOfWeek(now), 'yyyy-MM-dd HH:mi:ss')}</div>
                <div>now start month: {format(startOfMonth(now), 'yyyy-MM-dd HH:mi:ss')}</div>
                <div>now end month: {format(endOfMonth(now), 'yyyy-MM-dd HH:mi:ss')}</div>
                <div>now day: {getDay(now)}</div>
                <div>asdf: {format(startOfWeek(now), 'EEEE', {})}</div>
            </div>
        </div>
    )
}

export default TestDate