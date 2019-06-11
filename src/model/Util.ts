export default class Util {
    public static convertToCommaSeparatedString(n: number): string {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    public static dateToString(date: Date) {
        return `${date.getUTCFullYear()}년 ${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일(${Util.dayToString(date.getUTCDay())}) ${date.getUTCHours()}:${date.getUTCMinutes()}`;
    }

    private static dayToString(day: number) {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days[day];
    }
}
