import WinningLotto from '@/model/WinningLotto';
import LottoNumber from '@/model/LottoNumber';
import LottoNumberGroup from '@/model/LottoNumberGroup';

test('Throws when bonus number duplicates with others', () => {
    expect(() => WinningLotto.of(LottoNumberGroup.from([
        LottoNumber.ofNumber(1),
        LottoNumber.ofNumber(2),
        LottoNumber.ofNumber(3),
        LottoNumber.ofNumber(4),
        LottoNumber.ofNumber(5),
        LottoNumber.ofNumber(6)]),
        LottoNumber.ofNumber(2)))
        .toThrow('중복되는 숫자가 있습니다.');
});
