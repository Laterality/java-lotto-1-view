<template>
    <header class="header">
        <router-link to="/"><b-button variant="outline-light" class="btn-home" v-bind:class="{invisible: !showHomeButton}">홈</b-button></router-link>
        <h1>{{ title }}</h1>
        <router-link to="/history">
            <b-button v-show="showHistoryButton" type="button" variant="light">지난 회차 당첨 내역 ≫</b-button>
        </router-link>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitleHeader extends Vue {
    @Prop() private title!: string;
    @Prop({default: true}) private showHistoryButton?: boolean;
    @Prop({default: true}) private showHomeButton?: boolean;
}
</script>

<style lang="scss" scoped>
.header {
    background: #00BCD4;
    box-sizing: border-box;
    height: 256px;
    margin-bottom: 24px;
    padding: 40px 0 0 60px;
    text-align: left;
}

.btn-home {
    margin-bottom: 40px;
}

.invisiable {
    visibility: hidden;
}

h1 {
    color: #fff;
    font-size: 48px;
    margin-bottom: 14px;
}
</style>
