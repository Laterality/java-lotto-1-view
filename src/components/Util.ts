export default class Util {
    public static convertToCommaSeparatedString(n: number): string {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
