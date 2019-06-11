export default class LottoNumber {
    public static readonly LOTTO_NUMBER_MIN = 1;
    public static readonly LOTTO_NUMBER_MAX = 45;

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

    public static compare(a: LottoNumber, b: LottoNumber): number {
        if (a._num > b._num) { return 1; }
        if (a._num < b._num) { return -1; }
        return 0;
    }

    private _num: number;

    private constructor(num: number) {
        this.assertValidRange(num);
        this._num = num;
    }

    private assertValidRange(num: number) {
        if (num < LottoNumber.LOTTO_NUMBER_MIN ||
            num > LottoNumber.LOTTO_NUMBER_MAX) {
            throw new Error('로또 숫자는 1에서 45 사이여야 합니다.');
        }
    }

    public get number() {
        return this._num;
    }
}