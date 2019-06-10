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

import BuyingMoneyInput from '@/components/BuyingMoneyInput.vue';
import ManualLottoNumberInput from '@/components/ManualLottoNumberInput.vue';
import WinningNumberInput from '@/components/WinningNumberInput.vue';

import BuyingMoney from '@/model/BuyingMoney';

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

    private onBuyingMoneySubmit(money: BuyingMoney) {
        this.disableBuyingMoney = true;
        this.showManualNumber = true;
        this.disableManulaNumber = false;
        console.log(money.money);
    }

    private onManualNumberSubmit(states: string[][]) {
        console.log(states);
        this.disableManulaNumber = true;
        this.showWinningNumber = true;
    }

    private onBackFromManualNumber() {
        this.disableBuyingMoney = false;
        this.disableManulaNumber = true;
    }

    private onWinningNumberSubmit(currentState: string[]) {
        console.log(currentState);
        this.disableWinningNumber = true;
        setTimeout(() => {
            this.$router.push('/result');
        }, 1500);
    }

    private onBackFromWinningNumber() {
        this.disableManulaNumber = false;
        this.disableWinningNumber = true;
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
