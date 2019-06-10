<template>
    <div>
        <TitleHeader title="추첨 결과"/>
        <p>Lotto result page</p>
        <p>{{ resultId }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import TitleHeader from '@/components/TitleHeader.vue';

@Component({
    components: {
        TitleHeader,
    }
})
export default class Result extends Vue {

    get resultId() {
        return this.$route.params['resultId']
    }
}
</script>


