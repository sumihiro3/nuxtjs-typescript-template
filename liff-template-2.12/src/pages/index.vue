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
            v-if="profile != null"
            :profile="profile"
            :isInClient="isInClient"
            @doLogout="doLogout"
          )
          //- show LINE login button when user not logged in
          line-login(
            v-else
            @doLogin="doLogin"
          )
          //- show buttons for execute LIFF APIs
          liff-apis(
            v-if="profile != null"
            :isInClient="isInClient"
            :os="os"
            @openWindow="openWindow"
            @sendMessage="sendMessage"
            @scanCode="scanCode"
          )
          //- show LIFF status
          liff-status(
            v-if="liffInitialized"
            :key="componentKey"
          )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Profile } from '@line/bot-sdk'
import {
  initLiff,
  isLineLoggedIn,
  isInClient,
  getOS,
  getLineProfile,
  liffLogin,
  liffLogout,
  openWindow,
  sendMessage,
  scanCode
} from '~/plugins/liff'

@Component({
  components: {
    LiffStatus: () => import('@/components/LiffStatus.vue'),
    LineProfile: () => import('@/components/LineProfile.vue'),
    LineLogin: () => import('@/components/LineLogin.vue'),
    LiffApis: () => import('@/components/LiffApis.vue')
  }
})
export default class Index extends Vue {
  profile: Profile | null = null
  liffInitialized: boolean = false
  isInClient: boolean = false
  os: string = ''
  componentKey: number = 0
  async asyncData(): Promise<void> {
    await console.log('LIFF_ID', process.env.LIFF_ID)
    await console.log('BASE_URL', process.env.BASE_URL)
  }

  async mounted() {
    if (this.liffInitialized === false) {
      await this.initializeLiff()
    }
    this.isInClient = isInClient()
    this.os = getOS()
    if (this.liffInitialized === true && this.loggedIn() === true) {
      this.profile = await getLineProfile()
    }
  }

  async initializeLiff() {
    const pageLiffId = process.env.LIFF_ID || ''
    this.liffInitialized = await initLiff(pageLiffId)
  }

  async doLogin() {
    // const redirectUrl = `${process.env.BASE_URL}?hogehoge=fugafuga`
    // console.info('LINE Login redirectUrl:', redirectUrl)
    await liffLogin()
    this.profile = await getLineProfile()
    this.componentKey += 1
  }

  async doLogout() {
    await liffLogout()
    this.profile = null
    this.componentKey += 1
  }

  loggedIn(): boolean {
    return isLineLoggedIn()
  }

  async getProfile(): Promise<Profile> {
    return await getLineProfile()
  }

  openWindow() {
    openWindow('https://line.me', this.isInClient)
  }

  sendMessage() {
    sendMessage()
  }

  async scanCode() {
    const result = await scanCode()
    console.log('Scanned!', result)
  }
}
</script>

<style lang="stylus">
.bg_red
  background-color #FF0000
</style>
