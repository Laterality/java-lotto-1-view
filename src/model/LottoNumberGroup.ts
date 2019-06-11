import LottoNumber from '@/model/LottoNumber';

export default class LottoNumberGroup {
    public static readonly LOTTO_NUMBERS_SIZE = 6;

    public static from(nums: LottoNumber[]) {
        nums = nums.sort(LottoNumber.compare);
        for (let i = 0; i < nums.length - 1; i++) {
            this.compareAndThrowDuplicationError(nums[i], nums[i + 1]);
        }
        return new LottoNumberGroup(nums);
    }

    private static compareAndThrowDuplicationError(a: LottoNumber, b: LottoNumber) {
        if (LottoNumber.compare(a, b) === 0) {
            throw new Error('로또 숫자는 중복되지 않는 숫자로 6개여야 합니다.');
        }
    }

    private nums: LottoNumber[];

    private constructor(nums: LottoNumber[]) {
        this.nums = [];
        nums.forEach((v) => this.nums.push(v));
        nums = nums.sort(LottoNumber.compare);
    }
}