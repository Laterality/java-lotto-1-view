<template>
    <div>
        <b-table :fields="fields" :items="results"></b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Util from '@/model/Util';

import ResultDto from '@/model/ResultDto';

export interface ResultTableItem {
    id: number,
    lottoRound: number,
    cntFirst: number,
    cntSecond: number,
    cntThird: number,
    cntFourth: number,
    cntFifth: number,
    cntNone: number,
    prizeMoneySum: string,
    regDate: string
}

@Component
export default class ResultTable extends Vue {
    @Prop() private results!: ResultTableItem[];

    private fields = [
        {key: 'lottoRound', label: '회차'},
        {key: 'cntFirst', label: '1등'},
        {key: 'cntSecond', label: '2등'},
        {key: 'cntThird', label: '3등'},
        {key: 'cntFourth', label: '4등'},
        {key: 'cntFifth', label: '5등'},
        {key: 'cntNone', label: '꽝'},
        {key: 'prizeMoneySum', label: '당첨금'},
        {key: 'regDate', label: '추첨일자'}
    ];
}
</script>
