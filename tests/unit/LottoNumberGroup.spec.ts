import LottoNumber from '@/model/LottoNumber';
import LottoNumberGroup from '@/model/LottoNumberGroup';

test('Throw exception when create Lotto number group with set of number with has invalid size', () => {
    const nums: LottoNumber[] = [
        LottoNumber.ofNumber(2),
        LottoNumber.ofNumber(5),
        LottoNumber.ofNumber(5),
        LottoNumber.ofNumber(10),
        LottoNumber.ofNumber(12),
        LottoNumber.ofNumber(7),
    ];
    expect(() => LottoNumberGroup.from(nums))
        .toThrow('로또 숫자는 6개여야 합니다.');
});