<template>
    <b-form-input
        class="lotto-number-input"
        v-model="lottoNumberValue"
        @change="handleChange"
        type="text"
        :maxlength="maxValue.length"
        :disabled="!isEnabled()"></b-form-input>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LottoNumber from '@/model/LottoNumber';

@Component
export default class LottoNumberInput extends Vue {
    @Prop() private isEnabled!: () => boolean;
    @Prop() private onChange!: (n: string) => void;

    private lottoNumberValue: string;
    private maxValue: string;

    constructor() {
        super();
        this.maxValue = LottoNumber.LOTTO_NUMBER_MAX.toString();
        this.lottoNumberValue = '';
    }

    private handleChange() {
        this.onChange(this.lottoNumberValue);
    }
}
</script>

<style lang="scss" scoped>
.lotto-number-input {
    display: inline-block;
    width: 3rem;
    text-align: center;
}
</style>
