export default class BuyingMoney {
    public static readonly UNIT_PRICE = 1000;
    public static readonly MAX_PER_BUYING = 100_000;

    public static ofNumber(money: number): BuyingMoney {
        return new BuyingMoney(money);
    }

    public static ofString(money: string): BuyingMoney {
        const num = Number(money);
        if (isNaN(num)) {
            throw BuyingMoney.createNotANumberError();
        }
        return BuyingMoney.ofNumber(num);
    }

    private static createInvalidMoneyError() {
        return new Error('올바르지 않은 금액입니다.');
    }

    private static createNotANumberError() {
        return new Error('숫자를 입력해주세요.');
    }

    private readonly _money: number;

    private constructor(money: number) {
        this.assertValidRange(money);
        this._money = money;
    }

    private assertValidRange(money: number) {
        if (money < BuyingMoney.UNIT_PRICE ||
            money > BuyingMoney.MAX_PER_BUYING) {
            throw BuyingMoney.createInvalidMoneyError();
        }
    }

    public get money() {
        return this._money;
    }
}
