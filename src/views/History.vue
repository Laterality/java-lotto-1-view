<template>
    <div>
        <TitleHeader title="당첨 내역" :showHistoryButton="false"/>
        <div class="container">
            <ResultTable :results="items" :enableLink="true" caption="추첨 내역은 최근 5개까지만 제공됩니다."/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Request from '@/model/Request';

import ResultTable, { ResultTableItem } from '@/components/ResultTable.vue';
import TitleHeader from '@/components/TitleHeader.vue';

import ResultDto from '../model/ResultDto';

@Component({
    components: {
        TitleHeader,
        ResultTable,
    }})
export default class History extends Vue {
    private items: ResultTableItem[] = [];

    private beforeMount() {
        Request.retrieveResults(5)
            .then((res) => {
                res.data.aggregations
                    .map((obj: any) => ResultDto.of(obj))
                    .map((dto: ResultDto) => dto.toJson())
                    .forEach((obj: any) => this.items.push(obj));
            });
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 0 auto;
    width: 80%;
}
</style>

