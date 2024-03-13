export const dateToNumbers = (date: Date): string => {
    const day: number = date.getDate();
    const month: string = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : String(date.getMonth() + 1);
    const year: number = date.getFullYear();

    return `${day}-${month}-${year}`;
}



// Example usage:
// const currentDate: Date = new Date();