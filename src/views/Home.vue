<template>
  <div class="home">
    <TitleHeader title="로또 구입" :showHomeButton="false"/>
    <LottoBuyingForm 
      :onSubmit="handleSubmit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LottoBuyingForm from '@/components/LottoBuyingForm.vue';
import TitleHeader from '@/components/TitleHeader.vue';

@Component({
  components: {
    TitleHeader,
    LottoBuyingForm,
  },
})
export default class Home extends Vue {

  private handleSubmit(value: number) {}
}
</script>
