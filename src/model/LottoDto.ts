import Util from '@/model/Util';

export default class LottoDto {

    public static of(json: any) {
        return new LottoDto(
            json['id'],
            json['number0'],
            json['number1'],
            json['number2'],
            json['number3'],
            json['number4'],
            json['number5'],
            json['price'],
            new Date(
                json['regDate']['date']['year'], json['regDate']['date']['month'], json['regDate']['date']['day'],
                json['regDate']['time']['hour'], json['regDate']['time']['minute'], json['regDate']['time']['second']
            ),
        );
    }

    private constructor(
        private _id: number,
        private _number0: number,
        private _number1: number,
        private _number2: number,
        private _number3: number,
        private _number4: number,
        private _number5: number,
        private _price: number,
        private _regDate: Date) {}

    public toJson() {
        return {
            id: this._id,
            number0: this._number0,
            number1: this._number1,
            number2: this._number2,
            number3: this._number3,
            number4: this._number4,
            number5: this._number5,
            price: this._price,
            regDate: Util.dateToString(this._regDate),
        };
    }
}
