<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(
      xs12
      sm8
      md6
    )
      div.text-center
        v-img.my-10(
          src='LINE_APP.png'
          contain
          height="200"
        )
        liff-functions(
          v-if="liffInitialized"
        )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { LineUser } from '@/types'
import { initLiff } from '~/plugins/liff'

@Component({
  components: {
    Logo: () => import('@/components/Logo.vue'),
    VuetifyLogo: () => import('@/components/VuetifyLogo.vue'),
    LiffFunctions: () => import('@/components/LiffFunctions.vue')
  }
})
export default class Index extends Vue {
  lineUser?: LineUser
  liffInitialized: boolean = false
  async asyncData(): Promise<void> {
    await console.log('LIFF_ID', process.env.LIFF_ID)
  }

  async mounted() {
    await this.initializeLiff()
  }

  async initializeLiff() {
    const pageLiffId = process.env.LIFF_ID || ''
    this.liffInitialized = await initLiff(pageLiffId)
  }
}
</script>

<style lang="stylus">
.bg_red
  background-color #FF0000
</style>
