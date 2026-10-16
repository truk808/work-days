import { useState } from 'react';
import styles from './Main.module.css';
import { Calendar } from "../../components/Сalendar/Calendar.tsx";
import { Settings } from "../../components/Settings/Settings.tsx";

export const Main = () => {
    const [workDays, setWorkDays] = useState<number>(2);
    const [restDays, setRestDays] = useState<number>(2);
    const [startDate, setStartDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );

    const handleSaveSettings = (settings: { workDays: number; restDays: number; startDate: string }) => {
        setWorkDays(settings.workDays);
        setRestDays(settings.restDays);
        setStartDate(settings.startDate);
    };

    return (
        <div className={styles.main}>
            <div className={styles.title}>Work Days</div>
            <div className={styles.content}>
                <Calendar
                    workDays={workDays}
                    restDays={restDays}
                    startDate={startDate}
                />
                <Settings
                    onSave={handleSaveSettings}
                />
            </div>
        </div>
    );
};