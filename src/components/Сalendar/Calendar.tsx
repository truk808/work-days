import { useState } from "react";
import styles from './Calendar.module.css';
import { getDaysForMonth } from "../../helper/getDaysForMonth.ts";
import { MONTH_NAMES } from "../../const/mounthNames.const.ts";
import { WEEK_DAYS } from "../../const/weekDays.const.ts";

interface CalendarProps {
    workDays?: number;
    restDays?: number;
    startDate?: string;
}

export const Calendar = ({ workDays = 2, restDays = 2, startDate }: CalendarProps) => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const days = getDaysForMonth(month, year);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIfWorkDay = (date: Date) => {
        if (!startDate) return false;

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const current = new Date(date);
        current.setHours(0, 0, 0, 0);

        const diffTime = current.getTime() - start.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return false;

        const cycleLength = workDays + restDays;
        const dayInCycle = ((diffDays % cycleLength) + cycleLength) % cycleLength;

        return dayInCycle < workDays;
    };

    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1);
        } else {
            setMonth((prev) => prev - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1);
        } else {
            setMonth((prev) => prev + 1);
        }
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.header}>
                <button onClick={handlePrevMonth}>&larr;</button>
                <div>
                    <span>{MONTH_NAMES[month]} </span>
                    <span>{year}</span>
                </div>
                <button onClick={handleNextMonth}>&rarr;</button>
            </div>

            <div className={styles.weekDaysGrid}>
                {WEEK_DAYS.map((day) => (
                    <div key={day} className={styles.weekDayCell}>
                        {day}
                    </div>
                ))}
            </div>

            <div className={styles.daysGrid}>
                {days.map((dayItem, index) => {
                    if (dayItem === null) {
                        return <div key={`empty-${index}`} className={styles.emptyCell} />;
                    }

                    const currentDate = new Date(year, month, dayItem);
                    currentDate.setHours(0, 0, 0, 0);

                    const isWork = checkIfWorkDay(currentDate);
                    const isToday = currentDate.getTime() === today.getTime();

                    return (
                        <div
                            key={index}
                            className={`${styles.dayCell} ${isWork ? styles.isWork : styles.isRest}`}
                        >
                            {dayItem}
                            {isToday && <span className={styles.todayDot} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};