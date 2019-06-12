<template>
    <b-form @submit="handleOk" v-on:submit.prevent>
        <label for="input-winning-number">당첨 번호</label>
        <WinningNumberInputGroup 
            id="input-winning-number"
            :isEnabled="isEnabled"
            @state-change="handleStateChange"
            />
        <b-alert v-model="showAlert" variant="danger" class="alert">{{ alertMessage }}</b-alert>
        <transition name="fade">
            <div class="button-group" v-if="isEnabled()">
                <b-button type="button" variant="primary" @click="handleOk">확인</b-button>
                <b-button type="button" variant="secondary" @click="handleBack">뒤로</b-button>
            </div>
        </transition>
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
    @Prop() private onSubmit!: (currentState: string[]) => Error | null;
    @Prop() private onBack!: () => void;
    @Prop() private isEnabled!: () => boolean;

    private states: string[] = ['', '', '', '', '', ''];

    private showAlert = false;
    private alertMessage = '';

    private handleStateChange(newStates: string[]) {
        this.states = newStates;
    }

    private handleOk() {
        const err = this.onSubmit(this.states);
        if (err !== null) {
            this.alertMessage = err.message;
            this.showAlert = true;
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
.alert {
    margin: 18px 0;
}

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

