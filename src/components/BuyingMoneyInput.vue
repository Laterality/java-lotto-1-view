<template>
    <b-form @submit="onBuyingMoneySubmit" v-on:submit.prevent>
        <label for="input-buying-money">구입 금액</label>
        <!-- maxlength 속성 사용을 위해 text 타입 사용 -->
        <b-form-input
            id="input-buying-money"
            class="buying-money-input"
            v-model="buyingMoneyValue"
            type="text"
            :placeholder="minBuyingMoney"
            :maxlength="maxBuyingMoney.length"
            :disabled="!isEnabled()"></b-form-input>원
        <b-form-text>구입 금액은 {{ minBuyingMoneyWithComma }}원 이상이어야 합니다. 한번에 {{ maxBuyingMoneyWithComma }}원까지 구입할 수 있습니다.</b-form-text>
        <b-alert v-model="showAlert" variant="danger">{{ alertMessage }}</b-alert>
        <transition name="fade">
            <div class="button-group" v-if="isEnabled()">
                <b-button type="button" variant="primary" @click="onBuyingMoneySubmit">확인</b-button>
            </div>
        </transition>
    </b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Util from '@/model/Util';

import BuyingMoney from '@/model/BuyingMoney';

@Component
export default class BuyingMoneyInput extends Vue {
    @Prop() private onSubmit!: (money: BuyingMoney) => void;
    @Prop() private isEnabled!: () => boolean;

    // Vue model
    private buyingMoneyValue: string | null;
    private minBuyingMoney: string;
    private maxBuyingMoney: string;
    private minBuyingMoneyWithComma: string;
    private maxBuyingMoneyWithComma: string;
    private showAlert: boolean;
    private alertMessage: string;

    // Model
    private buyingMoney: BuyingMoney | null;

    constructor() {
        super();
        this.buyingMoney = null;
        this.buyingMoneyValue = null;
        this.minBuyingMoneyWithComma = Util.convertToCommaSeparatedString(BuyingMoney.UNIT_PRICE);
        this.maxBuyingMoneyWithComma = Util.convertToCommaSeparatedString(BuyingMoney.MAX_PER_BUYING);
        this.minBuyingMoney = BuyingMoney.UNIT_PRICE.toString();
        this.maxBuyingMoney = BuyingMoney.MAX_PER_BUYING.toString();
        this.showAlert = false;
        this.alertMessage = '';
    }

    private onBuyingMoneySubmit() {
        try {
            this.assertInputValueNotNull();
            const buyingMoney = BuyingMoney.ofString(this.buyingMoneyValue as string);
            this.buyingMoney = buyingMoney;
            this.showAlert = false;
            this.onSubmit(buyingMoney);
        } catch (e) {
            this.handleError(e);
        }
    }

    private assertInputValueNotNull() {
        if (this.buyingMoneyValue === null) {
            throw new Error('금액을 입력해주세요');
        }
    }

    private handleError(e: Error) {
        this.alertMessage = e.message;
        this.showAlert = true;
    }

}
</script>

<style lang="scss" scoped>
.buying-money-input {
    display: inline-block;
    margin: 0 8px 0 18px;
    width: 5rem;
}

.button-group {
    margin-top: 18px;
}
</style>
