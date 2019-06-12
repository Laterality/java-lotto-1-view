import LottoNumberGroup from './LottoNumberGroup';
import LottoNumber from './LottoNumber';

export default class WinningLotto {

    public static of(winningNumbers: LottoNumberGroup, bonusNumber: LottoNumber) {
        return new WinningLotto(winningNumbers, bonusNumber);
    }

    private constructor(
        private _winningNumbers: LottoNumberGroup,
        private _winningBonusNumber: LottoNumber,
    ) {
        if (_winningNumbers.has(_winningBonusNumber)) {
            throw new Error('중복되는 숫자가 있습니다.');
        }
    }

    public numbersToArray() {
        return this._winningNumbers.toArray();
    }

    public get bonusNumber() {
        return this._winningBonusNumber.number;
    }
}
