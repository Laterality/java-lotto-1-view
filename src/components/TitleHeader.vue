<template>
    <header class="header">
        <h1>{{ title }}</h1>
        <router-link to="/history">
            <button class="btn btn-light">지난 회차 당첨 내역 ≫</button>
        </router-link>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitleHeader extends Vue {
    @Prop() private title!: string;
}
</script>

style <style lang="scss" scoped>
h1 {
    color: #fff;
    font-size: 48px;
    margin-bottom: 14px;
}

.header {
    background: #00BCD4;
    box-sizing: border-box;
    height: 256px;
    padding: 100px 0 0 60px;
    text-align: left;
}
</style>
