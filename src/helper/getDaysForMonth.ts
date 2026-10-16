export const getDaysForMonth = (monthIndex: number, yearNumber: number) => {
    const days = [];
    const firstDayOfMonth = new Date(yearNumber, monthIndex, 1);
    const lastDayOfMonth = new Date(yearNumber, monthIndex + 1, 0);

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    for (let i = 0; i < startDayOfWeek; i++) {
        days.push(null);
    }

    const totalDays = lastDayOfMonth.getDate();
    for (let d = 1; d <= totalDays; d++) {
        days.push(d);
    }

    return days;
};