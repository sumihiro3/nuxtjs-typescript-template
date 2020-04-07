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
        client-only
          //- show user profile when user logged in
          line-profile(
            v-if="liffInitialized === true && loggedIn() === true"
            v-show="profile"
            :lineProfile="profile"
          )
          //- show LINE login button when user not logged in
          line-login(
            v-else
            @doLogin="doLogin"
          )
          //- show LIFF status
          liff-status(
            v-if="liffInitialized"
          )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Profile } from '@line/bot-sdk'
import {
  initLiff,
  isLineLoggedIn,
  getLineProfile,
  liffLogin
} from '~/plugins/liff'

@Component({
  components: {
    LiffStatus: () => import('@/components/LiffStatus.vue'),
    LineProfile: () => import('@/components/LineProfile.vue'),
    LineLogin: () => import('@/components/LineLogin.vue')
  }
})
export default class Index extends Vue {
  profile: Profile | null = null
  liffInitialized: boolean = false
  async asyncData(): Promise<void> {
    await console.log('LIFF_ID', process.env.LIFF_ID)
    await console.log('BASE_URL', process.env.BASE_URL)
  }

  async mounted() {
    await this.initializeLiff()
    if (this.loggedIn() === true) {
      this.profile = await getLineProfile()
    }
  }

  async initializeLiff() {
    const pageLiffId = process.env.LIFF_ID || ''
    this.liffInitialized = await initLiff(pageLiffId)
  }

  async doLogin() {
    await liffLogin()
    this.profile = await getLineProfile()
  }

  loggedIn(): boolean {
    return isLineLoggedIn()
  }

  async getProfile(): Promise<Profile> {
    return await getLineProfile()
  }
}
</script>

<style lang="stylus">
.bg_red
  background-color #FF0000
</style>
