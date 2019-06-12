<template>
    <b-form @submit="onSubmit" v-on:submit.prevent>
        <label for="input-manual-quantity">수동 구입</label>
        <b-form-input
            id="input-manual-quantity"
            class="manual-quantity-input"
            v-model="inputStates.length"
            type="number"
            disabled></b-form-input>장
        <div class="manual-numbers">
            <ul>
                <template v-for="(item, index) in inputStates">
                    <LottoNumberInputGroup
                        class="manual-number-item"
                        :onChange="(col, v) => handleOnNumberChange(index, col, v)"
                        :isEnabled="isEnabled"
                        @delete-row="handleDelete(index)"
                        :key="item.id"/>
                </template>
            </ul>
        </div>
        <b-alert v-model="showAlert" variant="danger">{{ alertMessage }}</b-alert>
        <transition name="fade">
            <div class="button-group" v-show="isEnabled()">
                <b-button type="button" variant="primary" class="btn" @click="handleSubmit">확인</b-button>
                <b-button type="button" variant="secondary" class="btn" @click="onBack">뒤로</b-button>
                <b-button type="button" variant="outline-success" class="btn" @click="addNumber">번호 추가</b-button>
            </div>
        </transition>
    </b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import LottoNumberGroup from '@/model/LottoNumberGroup';
import LottoNumber from '@/model/LottoNumber';

import LottoNumberInputList from '@/components/LottoNumberInputList.vue';
import LottoNumberInputGroup from '@/components/LottoNumberInputGroup.vue';

@Component({
    components: {
        LottoNumberInputGroup,
    }
})
export default class ManualLottoNumberInput extends Vue {
    @Prop() private isEnabled!: () => boolean;
    @Prop() private onSubmit!: (states: string[][]) => Error | null;
    @Prop() private onBack!: () => void;

    private inputStates: InputGroupState[] = [];

    private manualQuantity: number;

    private showAlert = false;
    private alertMessage = '';

    constructor() {
        super();
        this.manualQuantity = 0;
    }

    private handleOnNumberChange(row: number, index: number, newValue: string) {
        this.inputStates[row].updateState(index, newValue);
    }

    private handleDelete(row: number) {
        this.inputStates.splice(row, 1);
    }

    private handleSubmit() {
        const states: string[][] = [];
        for (const i of this.inputStates) {
            states.push(i.state);
        }

        const err = this.onSubmit(states);
        if (err !== null) {
            this.showAlert = true;
            this.alertMessage = err.message;
            return;
        }

        this.showAlert = false;
    }

    private addNumber() {
        this.inputStates.push(new InputGroupState(LottoNumberGroup.LOTTO_NUMBERS_SIZE));
        this.manualQuantity++;
    }

}

class InputGroupState {
    private _id: number;
    private static nextId = 1;

    private _states: string[] = [];

    constructor(stateSize: number) {
        this._id = InputGroupState.nextId++;
        for(let i = 0; i < stateSize; i++) {
            this._states.push('');
        }
    }

    public get id() {
        return this._id;
    }

    public get state() {
        return this._states;
    }

    public updateState(col: number, val: string) {
        this._states[col] = val
    }
}
</script>

<style lang="scss" scoped>
.manual-quantity-input {
    display: inline-block;
    margin: 0 8px 0 18px;
    text-align: center;
    width: 3rem;
}

.button-group {
    margin-top: 18px;
}

.btn {
    margin: 0 14px;

    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
}

.manual-numbers ul {
    list-style: none;
}

.manual-number-item {
    margin: 12px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
</style>

