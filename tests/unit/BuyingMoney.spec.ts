import BuyingMoney from '@/model/BuyingMoney';

test('Throw exception when invalid range', () => {
    expect(() => BuyingMoney.ofNumber(14000))
        .not.toThrowError('*');
    expect(() => BuyingMoney.ofNumber(0))
        .toThrowError(new Error('올바르지 않은 금액입니다.'));
    expect(() => BuyingMoney.ofNumber(100_001))
        .toThrowError(new Error('올바르지 않은 금액입니다.'));
});

test('Throw exception when create with invalid string', () => {
    expect(() => BuyingMoney.ofString('abcdef'))
        .toThrowError(new Error('숫자를 입력해주세요.'));
});
