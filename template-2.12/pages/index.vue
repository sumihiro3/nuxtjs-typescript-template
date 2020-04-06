<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a href="https://vuetifyjs.com" target="_blank"> documentation </a>.
          </p>
          <p>
            If you have questions, please join the official
            <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a href="https://nuxtjs.org/" target="_blank">
            Nuxt Documentation
          </a>
          <br />
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    Logo: () => import('@/components/Logo.vue'),
    VuetifyLogo: () => import('@/components/VuetifyLogo.vue')
  }
})
export default class Index extends Vue {
  name: string = ''
  async asyncData(context: Context): Promise<object> {
    // const { app, store } = context;
    const { $axios } = context.app
    await console.log('context in asyncData:', context)
    await console.log('API_BASE_URL', process.env.API_BASE_URL)
    const users = await $axios.$get(`users`)
    console.log(users)
    return { users }
  }

  async loadName(): Promise<string> {
    await console.log('function loadName called!')
    return 'World!!'
  }

  async mounted() {
    console.log('name:', this.name)
    const s: string = await this.loadName()
    this.name = s
    console.log('name (Updated):', this.name)
  }
}
</script>
