export default class LottoNumber {
    public static readonly LOTTO_NUMBER_MIN = 1;
    public static readonly LOTTO_NUMBER_MAX = 45;

    private num: number;

    public static ofNumber(num: number) {
        return new LottoNumber(num);
    }

    public static ofString(num: string) {
        const parsed = Number(num);
        if (isNaN(parsed)) {
            throw new Error('숫자를 입력해주세요.');
        }
        return new LottoNumber(parsed);
    }

    private constructor(num: number) {
        this.assertValidRange(num);
        this.num = num;
    }

    private assertValidRange(num: number) {
        if (num < LottoNumber.LOTTO_NUMBER_MIN ||
            num > LottoNumber.LOTTO_NUMBER_MAX) {
            throw new Error('로또 숫자는 1에서 45 사이여야 합니다.');
        }
    }

    public static compare(a: LottoNumber, b: LottoNumber): number {
        if (a.num > b.num) { return 1; }
        if (a. num < b.num) { return -1; }
        return 0;
    }
}