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

// 3글자 이상을 나타내는 정규식
export const isValidInput = (input: string): boolean => {
    const regex = /^.{3,}$/; 
    return regex.test(input);
}

//discord url 검사 정규식
export const isValidDiscordURL = (url: string): boolean => {
    const regex = /^https:\/\/discord.gg/;
    return regex.test(url);
}