import LottoNumber from '@/model/LottoNumber';

test('Throws when lotto number is in invalid range', () => {
    expect(() => LottoNumber.ofNumber(46))
        .toThrow('로또 숫자는 1에서 45 사이여야 합니다.');
    expect(() => LottoNumber.ofNumber(0))
        .toThrow('로또 숫자는 1에서 45 사이여야 합니다.');
});

test('Throws when lotto number is NaN', () => {
    expect (() => LottoNumber.ofString('abcde'))
        .toThrow('숫자를 입력해주세요.');
})