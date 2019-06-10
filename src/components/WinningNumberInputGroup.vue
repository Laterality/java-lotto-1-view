<template>
    <div>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => onChange(0, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => onChange(1, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => onChange(2, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => onChange(3, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => onChange(4, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => onChange(5, n)"
            :isEnabled="isEnabled"/>

        <label for="input-winning-bonus">보너스 볼</label>
        <LottoNumberInput 
            id="input-winning-bonus"
            class="lotto-number-input"
            :onChange="(n) => onChange(6, n)"
            :isEnabled="isEnabled"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LottoNumberInput from '@/components/LottoNumberInput.vue';

@Component({
    components: {
        LottoNumberInput,
    }
})
export default class WinningNumberInputGroup extends Vue {
    @Prop() private isEnabled!: () => boolean;

    private states: string[] = ['', '', '', '', '', '', ''];

    private onChange(index: number, newValue: string) {
        this.states[index] = newValue;
        this.$emit('state-change', this.states);
    }
}
</script>

<style lang="scss" scoped>
.lotto-number-input {
    margin: 0 14px;
}
</style>




