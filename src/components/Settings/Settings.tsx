import { useState } from 'react';
import styles from './Settings.module.css';

interface SettingsProps {
    onSave?: (settings: { workDays: number; restDays: number; startDate: string }) => void;
}

export const Settings = ({ onSave }: SettingsProps) => {
    const [workDays, setWorkDays] = useState<number>(2);
    const [restDays, setRestDays] = useState<number>(2);
    const [startDate, setStartDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );

    const presets = [
        { work: 2, rest: 2, label: '2 / 2' },
        { work: 3, rest: 3, label: '3 / 3' },
        { work: 4, rest: 4, label: '4 / 4' },
        { work: 5, rest: 2, label: '5 / 2' },
    ];

    const handleApplyPreset = (w: number, r: number) => {
        setWorkDays(w);
        setRestDays(r);
        if (onSave) {
            onSave({ workDays: w, restDays: r, startDate });
        }
    };

    const handleSave = () => {
        console.log({ workDays, restDays, startDate })
        if (onSave) {
            onSave({ workDays, restDays, startDate });
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Настройка графика</h3>
            <div className={styles.fieldGroup}>
                <label className={styles.label}>График работы:</label>
                <div className={styles.scheduleInputGroup}>
                    <input
                        type="number"
                        min="1"
                        max="30"
                        value={workDays}
                        onChange={(e) => setWorkDays(Number(e.target.value))}
                        className={styles.inputNumber}
                    />
                    <span>рабочих</span>
                    <span>на</span>
                    <input
                        type="number"
                        min="1"
                        max="30"
                        value={restDays}
                        onChange={(e) => setRestDays(Number(e.target.value))}
                        className={styles.inputNumber}
                    />
                    <span>выходных</span>
                </div>
            </div>
            <div className={styles.presetsGroup}>
                {presets.map((p) => (
                    <button
                        key={p.label}
                        type="button"
                        className={`${styles.presetBtn} ${workDays === p.work && restDays === p.rest ? styles.activePreset : ''}`}
                        onClick={() => handleApplyPreset(p.work, p.rest)}
                    >
                        {p.label}
                    </button>
                ))}
            </div>
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Первый рабочий день:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={styles.inputDate}
                />
            </div>
            <button className={styles.saveButton} onClick={handleSave}>
                Применить график
            </button>
        </div>
    );
};