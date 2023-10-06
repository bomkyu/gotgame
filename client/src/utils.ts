export function formatDateToYYYYMMDD(date : string) {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}