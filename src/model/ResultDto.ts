import Util from '@/model/Util';

export default class ResultDto {

    private constructor(
        private _id: number,
        private _lottoRound: number,
        private _cntFirst: number,
        private _cntSecond: number,
        private _cntThird: number,
        private _cntFourth: number,
        private _cntFifth: number,
        private _cntNone: number,
        private _prizeMoneySum: number,
        private _regDate: Date) { }

    public static of(json: any) {
        return new ResultDto(
            json['id'],
            json['lottoRound'],
            json['cntFirst'],
            json['cntSecond'],
            json['cntThird'],
            json['cntFourth'],
            json['cntFifth'],
            json['cntNone'],
            json['prizeMoneySum'],
            new Date(
                json['regDate']['date']['year'], json['regDate']['date']['month'], json['regDate']['date']['day'],
                json['regDate']['time']['hour'], json['regDate']['time']['minute'], json['regDate']['time']['second']
            ),
        );
    }

    public toJson() {
        return {
            id: this._id,
            lottoRound: this._lottoRound,
            cntFirst: this._cntFirst,
            cntSecond: this._cntSecond,
            cntThird: this._cntThird,
            cntFourth: this._cntFourth,
            cntFifth: this._cntFifth,
            cntNone: this._cntNone,
            prizeMoneySum: Util.convertToCommaSeparatedString(this._prizeMoneySum),
            regDate: Util.dateToString(this._regDate),
        };
    }

    public get id() {
        return this._id;
    }

    public get lottoRound() {
        return this._lottoRound;
    }

    public get cntFirst() {
        return this._cntFirst;
    }

    public get cntSecond() {
        return this._cntSecond;
    }

    public get cntThird() {
        return this._cntThird;
    }

    public get cntFourth() {
        return this._cntFourth;
    }

    public get cntFifth() {
        return this._cntFifth;
    }

    public get cntNone() {
        return this._cntNone;
    }

    public get prizeMoneySum() {
        return this._prizeMoneySum;
    }

    public get regDate() {
        return this._regDate;
    }
}