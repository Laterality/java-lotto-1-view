<template>
    <div>
        <transition name="fade">
            <BuyingMoneyInput
                class="input-elm"
                :isEnabled="() => !disableBuyingMoney"
                :onSubmit="onBuyingMoneySubmit"/>
        </transition>
        <transition name="fade">
            <ManualLottoNumberInput
                v-show="showManualNumber"
                class="input-elm"
                :isEnabled="() => !disableManulaNumber"
                :onSubmit="onManualNumberSubmit"
                :onBack="onBackFromManualNumber"/>
        </transition>
        <transition name="fade">
            <WinningNumberInput 
                v-show="showWinningNumber"
                :isEnabled="() => !disableWinningNumber"
                :onSubmit="onWinningNumberSubmit"
                :onBack="onBackFromWinningNumber"/>
        </transition>
        <b-alert v-model="showAlert" variant="danger">{{ alertMessage }}</b-alert>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Axios, { AxiosResponse } from 'axios';

import Request from '@/model/Request';

import BuyingMoney from '@/model/BuyingMoney';

import BuyingMoneyInput from '@/components/BuyingMoneyInput.vue';
import ManualLottoNumberInput from '@/components/ManualLottoNumberInput.vue';
import WinningNumberInput from '@/components/WinningNumberInput.vue';
import LottoNumber from '@/model/LottoNumber';
import LottoNumberGroup from '../model/LottoNumberGroup';
import WinningLotto from '@/model/WinningLotto';

@Component({
    components: {
        BuyingMoneyInput,
        ManualLottoNumberInput,
        WinningNumberInput,
    },
})
export default class LottoBuyingForm extends Vue {
    private disableBuyingMoney = false;
    private disableManulaNumber = false;
    private disableWinningNumber = false;

    private showManualNumber = false;
    private showWinningNumber = false;

    private showAlert = false;
    private alertMessage = '';

    private buyingMoney: BuyingMoney | null = null;
    private manualNumberStates: LottoNumberGroup[] = [];
    private winningNumberState: WinningLotto | null = null;

    private onBuyingMoneySubmit(money: BuyingMoney) {
        this.disableBuyingMoney = true;
        this.showManualNumber = true;
        this.disableManulaNumber = false;
        this.buyingMoney = money;
    }

    private onManualNumberSubmit(states: string[][]): Error | null {
        try {
            this.manualNumberStates = states
                .map(row => row
                    .map(col => LottoNumber.ofString(col)))
                .map(row => LottoNumberGroup.from(row));
            this.disableManulaNumber = true;
            this.showWinningNumber = true;
            this.disableWinningNumber = false;
            return null;
        } catch(e) {
            return e;
        }

    }

    private onBackFromManualNumber() {
        this.disableBuyingMoney = false;
        this.disableManulaNumber = true;
    }

    private onWinningNumberSubmit(currentState: string[]): Error | null {
        try {
            const winningNums = currentState
                .map((s) => LottoNumber.ofString(s))
            this.winningNumberState = WinningLotto.of(
                LottoNumberGroup.from(winningNums.slice(0, 6)),
                winningNums[6]);
            this.disableWinningNumber = true;
            this.handleFormSubmit();
            return null;
        } catch(e) {
            return e;
        }
    }

    private onBackFromWinningNumber() {
        this.disableManulaNumber = false;
        this.disableWinningNumber = true;
    }

    private handleFormSubmit() {
        // AJAX 요청 처리
        // draw api 호출 후
        // this.$router.push('/result' + resultId);
        try {
            this.assertAllStateExist();
            const buyingMoney = this.buyingMoney as BuyingMoney;
            const totalQuantity = Math.floor(buyingMoney.money / BuyingMoney.UNIT_PRICE);
            const autoQuantity = totalQuantity - this.manualNumberStates.length;
            const convertedManualState = this.manualNumberStates.map((row) => 
                row.toArray());
            
            const wn = this.winningNumberState as WinningLotto as WinningLotto;
            const winningNumbers = wn.numbersToArray();
            const winningBonusNumber = wn.bonusNumber;

            Request.buyLotto(buyingMoney.money, convertedManualState)
            .then((res: AxiosResponse) => {
                const lottoIds = res.data['lottos'].map((obj: any) => obj.id);
                Request.drawLotto(lottoIds, winningNumbers, winningBonusNumber)
                    .then((res: AxiosResponse) => {
                        this.handleDrawResult(res);
                    });
             })
        } catch(e) {
            window.alert(e.message);
        }
    }

    private assertAllStateExist() {
        if (this.buyingMoney === null ||
            this.manualNumberStates === null ||
            this.winningNumberState === null) {
                throw new Error("상태가 이상해요 ㅠㅠ");
            }
    }

    private handleDrawResult(res: AxiosResponse) {
        if (res.data.result === 'ok') {
            this.$router.push({
                name: 'result',
                params: {
                    resultId: res.data['aggregation']['id'],
                }
            });
            return;
        }
        this.alertMessage = res.data.message;
        this.showAlert = true;
    }
}
</script>

<style lang="scss" scoped>
.input-elm {
    margin: 24px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
</style>
