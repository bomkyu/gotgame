export function formatDateToYYYYMMDD(date : string) {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export const escapeRegExp = (value : string) => { //특수문자가 들어가면 escape하는 정규식
    return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
  