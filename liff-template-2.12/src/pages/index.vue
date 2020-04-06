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
        logo
        vuetify-logo
      v-card
        v-card-title.headline.bg_red
          | Users
        v-list-item(
          v-for="user in users"
          :key="user.id" 
          two-line
        )
          v-list-item-content
            v-list-item-title
              | {{ user.name }}
            v-list-item-subtitle
              | {{ user.email }}
        v-card-actions
          v-spacer
          v-btn(
            color="primary"
            nuxt
            to="/inspire"
          )
            | Continue
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
// import Context from '~/plugins/liff'
import { LIFFErrorObject } from 'liff-type'
import { User, LineUser, LiffError } from '@/types'

@Component({
  components: {
    Logo: () => import('@/components/Logo.vue'),
    VuetifyLogo: () => import('@/components/VuetifyLogo.vue')
  }
})
export default class Index extends Vue {
  name: string = ''
  lineUser?: LineUser
  async asyncData(context: Context): Promise<object> {
    const { app } = context
    const { $axios } = app
    await console.log('context in asyncData:', context)
    await console.log('API_BASE_URL', process.env.API_BASE_URL)
    // get user list from JsonServer
    const usersJson = await $axios.$get(`users`)
    const users: User[] = usersJson
    console.log(users)
    return { users }
  }

  async mounted() {
    await this.initLiff()
    console.log('name:', this.name)
    const s: string = await this.loadName()
    this.name = s
    console.log('name (Updated):', this.name)
  }

  async initLiff() {
    // init liff
    const pageLiffId = process.env.LIFF_ID || ''
    await window.liff
      .init({
        liffId: pageLiffId
      })
      .then(() => {
        // LIFF initialized
        console.log('LIFF initialized')
        // eslint-disable-next-line no-undef
        liff
          .getProfile()
          .then(profile => {
            this.lineUser = profile
          })
          .catch((error: LiffError) => {
            console.warn('LIFF getProfile failed...', error)
          })
      })
      .catch((error: LIFFErrorObject) => {
        // LIFF initialize failed
        console.error('LIFF initialize failed', error)
        this.lineUser = undefined
      })
  }

  async loadName(): Promise<string> {
    await console.log('function loadName called!')
    return 'World!!'
  }
}
</script>

<style lang="stylus">
.bg_red
  background-color #FF0000
</style>
