interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUtc(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };