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
                :onOk="onWinningNumberSubmit"
                :onBack="onBackFromWinningNumber"/>
        </transition>
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

    private buyingMoney: BuyingMoney | null = null;
    private manualNumberStates: string[][] = [];
    private winningNumberStates: string[] = [];

    private onBuyingMoneySubmit(money: BuyingMoney) {
        this.disableBuyingMoney = true;
        this.showManualNumber = true;
        this.disableManulaNumber = false;
        this.buyingMoney = money;
    }

    private onManualNumberSubmit(states: string[][]) {
        console.log(states);
        this.disableManulaNumber = true;
        this.showWinningNumber = true;
        this.manualNumberStates = states;
    }

    private onBackFromManualNumber() {
        this.disableBuyingMoney = false;
        this.disableManulaNumber = true;
    }

    private onWinningNumberSubmit(currentState: string[]) {
        console.log(currentState);
        this.disableWinningNumber = true;
        this.winningNumberStates = currentState;
        this.handleFormSubmit();
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
            const totalQuantity = (this.buyingMoney as BuyingMoney).money / BuyingMoney.UNIT_PRICE;
            const autoQuantity = totalQuantity - this.manualNumberStates.length;
            const convertedManualState = this.manualNumberStates.map((row) => 
                row.map((col) => Number(col)));
            
            const winningNumbers = this.winningNumberStates.slice(0, 6).map(s => Number(s));
            const winningBonusNumber = Number(this.winningNumberStates[6]);

            Axios.all([
                Request.buyAutoLotto(autoQuantity),
                Request.buyManualLotto(convertedManualState),
            ])
            .then(Axios.spread((autoResponse: AxiosResponse, manResponse: AxiosResponse) => {
                let lottoIds: number[] = [];
                lottoIds = lottoIds.concat(autoResponse.data['lottos'].map((l: any) => l['id']));
                lottoIds = lottoIds.concat(manResponse.data['lottos'].map((l: any) => l['id']));

                Request.drawLotto(lottoIds, winningNumbers, winningBonusNumber)
                    .then((res: AxiosResponse) => {
                        this.$router.push({
                            name: 'result',
                            params: {
                                resultId: res.data['aggregation']['id'],
                            }
                        });
                    });
            }));
            
        } catch(e) {
            window.alert(e.message);
        }
    }

    private assertAllStateExist() {
        if (this.buyingMoney === null ||
            this.manualNumberStates === null ||
            this.winningNumberStates === null) {
                throw new Error("상태가 이상해요 ㅠㅠ");
            }
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
