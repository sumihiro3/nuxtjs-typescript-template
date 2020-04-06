<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Users
        </v-card-title>
        <v-list-item v-for="user in users" :key="user.id" two-line>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
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
import { User } from '@/types'

@Component({
  components: {
    Logo: () => import('@/components/Logo.vue'),
    VuetifyLogo: () => import('@/components/VuetifyLogo.vue')
  }
})
export default class Index extends Vue {
  name: string = ''
  async asyncData(context: Context): Promise<object> {
    const { app } = context
    const { $axios } = app
    // await console.log('context in asyncData:', context)
    await console.log('API_BASE_URL', process.env.API_BASE_URL)
    const usersJson = await $axios.$get(`users`)
    const users: User[] = usersJson
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
