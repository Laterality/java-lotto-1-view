<template>
    <div>
        <TitleHeader title="추첨 결과"/>
        <div class="container">
            <h1>추첨 통계</h1>
            <ResultTable 
                class="tbl"
                :results="items"
                :enableLink="false"/>
            <h1>당첨 번호</h1>
            <WinningLottoNumberTable 
                class="tbl"
                :winnings="winningNumbers"/>
            <h1>구입한 로또</h1>
            <LottoNumberTable 
                class="tbl"
                :lottos="lottoNumbers"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';

import Request from '@/model/Request';

import ResultDto from '@/model/ResultDto';
import LottoDto from '@/model/LottoDto';
import WinningLottoDto from '@/model/WinningLottoDto';

import TitleHeader from '@/components/TitleHeader.vue';
import ResultTable, { ResultTableItem } from '@/components/ResultTable.vue';
import WinningLottoNumberTable, { WinningLottoNumberTableItem } from '@/components/WinningLottoNumberTable.vue';
import LottoNumberTable, { LottoNumberTableItem } from '@/components/LottoNumberTable.vue';

@Component({
    components: {
        TitleHeader,
        ResultTable,
        WinningLottoNumberTable,
        LottoNumberTable,
    }})
export default class Result extends Vue {
    private items: ResultTableItem[] = [];
    private winningNumbers: WinningLottoNumberTableItem[] = [];
    private lottoNumbers: LottoNumberTableItem[] = [];

    constructor() {
        super();
    }

    private beforeMount() {
        Request.retrieveResultById(Number(this.$route.params.resultId))
            .then((res: AxiosResponse) => {
                this.items.push(ResultDto.of(res.data.aggregation).toJson());
                this.winningNumbers.push(WinningLottoDto.of(res.data.aggregation.winningLotto).toJson());
                res.data.aggregation.lottos
                    .map((obj: any) => LottoDto.of(obj))
                    .map((l: LottoDto) => l.toJson())
                    .forEach((json: any) => this.lottoNumbers.push(json));
            });
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 1.5rem;
    margin: 14px 0;
}

.container {
    margin: 0 auto;
    width: 80%;
}

.tbl {
    width: 90%;
    margin: 0 auto;
}
</style>
