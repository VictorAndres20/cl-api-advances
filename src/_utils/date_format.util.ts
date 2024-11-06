export const buildClassicDateFormat = (date: Date): string => {
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
} 

export const buildISODate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const sec = date.getSeconds();
    return `${date.getFullYear()}-${month.toString().length === 1 ? `0` : ''}${month}-${day.toString().length === 1 ? '0' : ''}${day}T${hour.toString().length === 1 ? '0' : ''}${hour}:${minute.toString().length === 1 ? '0' : ''}${minute}:${sec.toString().length === 1 ? '0' : ''}${sec}.000`
}