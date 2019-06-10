<template>
    <div>
        <TitleHeader title="추첨 결과"/>
        <ResultTable 
            :results="items"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Request from '@/model/Request';

import ResultDto from '@/model/ResultDto';

import TitleHeader from '@/components/TitleHeader.vue';
import ResultTable, { ResultTableItem } from '@/components/ResultTable.vue';
import { AxiosResponse } from 'axios';

@Component({
    components: {
        TitleHeader,
        ResultTable,
    }
})
export default class Result extends Vue {
    private items: ResultTableItem[] = [];

    constructor() {
        super();
    }

    beforeMount() {
        Request.retrieveResultById(Number(this.$route.params['resultId']))
            .then((res: AxiosResponse) => {
                this.items.push(ResultDto.of(res.data['aggregation']).toJosn());
            });
    }
}
</script>


