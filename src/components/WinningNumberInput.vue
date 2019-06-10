<template>
    <b-form @submit="handleOk" v-on:submit.prevent>
        <label for="input-winning-number">당첨 번호</label>
        <WinningNumberInputGroup 
            id="input-winning-number"
            :isEnabled="isEnabled"
            @state-change="handleStateChange"
            />
        <div class="button-group" v-if="isEnabled()">
            <b-button type="button" variant="primary" @click="handleOk">확인</b-button>
            <b-button type="button" variant="secondary" @click="handleBack">뒤로</b-button>
        </div>
    </b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import WinningNumberInputGroup from '@/components/WinningNumberInputGroup.vue';

@Component({
    components: {
        WinningNumberInputGroup,
    }
})
export default class WinningNumberInput extends Vue {
    @Prop() private onOk!: (currentState: string[]) => void;
    @Prop() private onBack!: () => void;
    @Prop() private isEnabled!: () => boolean;

    private states: string[] = [];

    private handleStateChange(newStates: string[]) {
        this.states = newStates;
    }

    private handleOk() {
        try {
            this.onOk(this.states);
        } catch(e) {
            console.log('error: ', e);
        }
    }

    private handleBack() {
        try {
            this.onBack();
        } catch(e) {
            console.log('error: ', e);
        }
    }
}
</script>

<style lang="scss" scoped>
.button-group {
    margin-top: 18px;
}

.btn {
    margin: 0 14px;

    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
</style>

