<template>
    <li
        @mouseover="showRemoveButton=true"
        @mouseleave="showRemoveButton=false">
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => handleChange(0, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => handleChange(1, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => handleChange(2, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => handleChange(3, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => handleChange(4, n)"
            :isEnabled="isEnabled"/>
        <LottoNumberInput 
            class="lotto-number-input"
            :onChange="(n) => handleChange(5, n)"
            :isEnabled="isEnabled"/>
    
        <transition name="fade">
            <b-button 
            type="button" 
            variant="danger" 
            class="btn-remove" 
            @click="$emit('delete-row')" 
            v-show="showRemoveButton && isEnabled()"><img src="../assets/baseline_delete_outline_white_18dp.png" alt="번호 삭제"></b-button>
        </transition>
    </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LottoNumberInput from '@/components/LottoNumberInput.vue';
import LottoNumber from '../model/LottoNumber';

@Component({
    components: {
        LottoNumberInput,
    }
})
export default class LottoNumberInputGroup extends Vue {
    @Prop() private isEnabled!: () => boolean;
    @Prop() private onChange!: (index: number, newValue: string) => void;
    @Prop() private onDelete!: () => void;

    private showRemoveButton = false;

    private handleChange(index: number, newValue: string) {
        this.onChange(index, newValue);
    }
}
</script>

<style lang="scss" scoped>
.lotto-number-input {
    margin: 0 14px;
}

.btn-remove {
    margin-left: 12px;
    padding: 4px 8px;
    transition: display 1s;

    img {
        width: 1.5rem;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.alert {
    margin: 14px 0 24px;
}
</style>

