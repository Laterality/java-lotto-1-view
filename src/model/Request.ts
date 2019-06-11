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
