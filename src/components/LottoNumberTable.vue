<template>
    <div>
        <b-table :fields="fields" :items="lottos"></b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface LottoNumberTableItem {
    number0: number,
    number1: number,
    number2: number,
    number3: number,
    number4: number,
    number5: number,
}

@Component
export default class LottoNumberTable extends Vue {
    @Prop() private lottos!: LottoNumberTableItem[];


    private fields = [
        {key: 'number0', label: '숫자1'},
        {key: 'number1', label: '숫자2'},
        {key: 'number2', label: '숫자3'},
        {key: 'number3', label: '숫자4'},
        {key: 'number4', label: '숫자5'},
        {key: 'number5', label: '숫자6'}
    ];
}
</script>
