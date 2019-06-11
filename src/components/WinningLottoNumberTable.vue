<template>
    <div>
        <b-table :fields="fields" :items="winnings"></b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface WinningLottoNumberTableItem {
    winningNumber0: number,
    winningNumber1: number,
    winningNumber2: number,
    winningNumber3: number,
    winningNumber4: number,
    winningNumber5: number,
    winningNumberBonus: number
}

@Component
export default class WinningLottoNumberTable extends Vue {
    @Prop() private winnings!: WinningLottoNumberTableItem[];

    private fields = [
        {key: 'winningNumber0', label: '숫자1'},
        {key: 'winningNumber1', label: '숫자2'},
        {key: 'winningNumber2', label: '숫자3'},
        {key: 'winningNumber3', label: '숫자4'},
        {key: 'winningNumber4', label: '숫자5'},
        {key: 'winningNumber5', label: '숫자6'},
        {key: 'winningNumberBonus', label: '보너스 볼'}
    ];
}
</script>
