<template>
    <div>
        <b-table :fields="fields" :items="results" class="tbl">j
            <template slot="table-caption">{{ caption }}</template>
            <template slot="lottoRound" slot-scope="row">
                <router-link :to="'/result/' + row.item.id" v-if="enableLink">{{ row.item.lottoRound }}</router-link>
                <template v-else>{{ row.item.lottoRound }}</template>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Util from '@/model/Util';

import ResultDto from '@/model/ResultDto';

export interface ResultTableItem {
    id: number;
    lottoRound: number;
    cntFirst: number;
    cntSecond: number;
    cntThird: number;
    cntFourth: number;
    cntFifth: number;
    cntNone: number;
    prizeMoneySum: string;
    rewardStr: string | undefined;
    regDate: string;
}

@Component
export default class ResultTable extends Vue {
    @Prop() private results!: ResultTableItem[];
    @Prop({default: false}) private showEarningRate?: boolean;
    @Prop({default: false}) private enableLink?: boolean;
    @Prop({default: ''}) private caption?: string;

    private fields = [
        {key: 'lottoRound', label: '회차'},
        {key: 'cntFirst', label: '1등'},
        {key: 'cntSecond', label: '2등'},
        {key: 'cntThird', label: '3등'},
        {key: 'cntFourth', label: '4등'},
        {key: 'cntFifth', label: '5등'},
        {key: 'cntNone', label: '꽝'},
        {key: this.showEarningRate ? 'rewardStr' : 'prizeMoneySum', 
            label: this.showEarningRate ? '당첨금(수익률)' : '당첨금'},
        {key: 'regDate', label: '추첨일자'},
    ];
}
</script>

<style lang="scss" scoped>
.tbl {
    white-space: pre-wrap;
    word-break: keep-all;
}
</style>
