import Axios, { AxiosPromise } from 'axios';

export default class Request {
    public static buyAutoLotto(quantity: number): AxiosPromise {
        return Axios.post(this.API_BASE_URL + '/buy-auto', {
            quantity,
        });
    }

    public static buyManualLotto(numbers: number[][]): AxiosPromise {
        return Axios.post(this.API_BASE_URL + '/buy-manual', {
            numbers,
        });
    }

    public static buyLotto(buyingMoney: number, manualNumbers: number[][]) {
        return Axios.post(this.API_BASE_URL + '/buy', {
            buyingMoney,
            manualNumbers,
        });
    }

    public static drawLotto(lottoIds: number[], winningNumbers: number[], winningBonusNumber: number): AxiosPromise {
        return Axios.post(this.API_BASE_URL + '/draw', {
            lottos: lottoIds,
            winningNumbers,
            winningBonusNumber,
        });
    }

    public static retrieveResultById(resultId: number): AxiosPromise {
        return Axios.get(this.API_BASE_URL + '/result/' + resultId);
    }

    public static retrieveResults(top: number): AxiosPromise {
        return Axios.get(this.API_BASE_URL + `/results?top=${top}`);
    }

    private static readonly API_BASE_URL = 'http://localhost:4567/api';
}
