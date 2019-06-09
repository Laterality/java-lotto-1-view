import LottoNumber from '@/model/LottoNumber';

export default class LottoNumberGroup {
    public static readonly LOTTO_NUMBERS_SIZE = 6;

    private nums: LottoNumber[];

    public static from(nums: LottoNumber[]) {
        const numSet = new Set<LottoNumber>();
        nums.forEach(v => {
            if (nums.findIndex(value => {
                return LottoNumber.compare(v, value) === 0;
            }) < 0) {
                numSet.add(v);
            }
        });
        this.assertSetHasValidSize(numSet);
        return new LottoNumberGroup(nums);
    }

    private constructor(nums: LottoNumber[]) {
        this.nums = [];
        nums.forEach(v => this.nums.push(v));
        nums = nums.sort(LottoNumber.compare);
    }

    private static assertSetHasValidSize(set: Set<LottoNumber>) {
        if (set.size != LottoNumberGroup.LOTTO_NUMBERS_SIZE) {
            throw new Error('로또 숫자는 6개여야 합니다.');
        }
    }
}