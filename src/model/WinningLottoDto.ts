import Util from '@/model/Util';

export default class WinningLottoDto {
    public static of(json: any) {
        return new WinningLottoDto(
            json.id,
            json.winningNumber0,
            json.winningNumber1,
            json.winningNumber2,
            json.winningNumber3,
            json.winningNumber4,
            json.winningNumber5,
            json.winningBonusNumber,
            new Date(
                json.regDate.date.year, json.regDate.date.month, json.regDate.date.day,
                json.regDate.time.hour, json.regDate.time.minute, json.regDate.time.second,
            ),
        );
    }

    private constructor(
        private _id: number,
        private _winningNumber0: number,
        private _winningNumber1: number,
        private _winningNumber2: number,
        private _winningNumber3: number,
        private _winningNumber4: number,
        private _winningNumber5: number,
        private _winningNumberBonus: number,
        private _regDate: Date) {}

    public toJson() {
        return {
            id: this._id,
            winningNumber0: this._winningNumber0,
            winningNumber1: this._winningNumber1,
            winningNumber2: this._winningNumber2,
            winningNumber3: this._winningNumber3,
            winningNumber4: this._winningNumber4,
            winningNumber5: this._winningNumber5,
            winningNumberBonus: this._winningNumberBonus,
            regDate: Util.dateToString(this._regDate),
        };
    }
}
