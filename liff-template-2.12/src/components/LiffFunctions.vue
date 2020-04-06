<template lang="pug">
  v-simple-table
    thead
      tr
        th.text-left
          | Status
        th.text-left
          | Value
    tbody
      tr(
        v-for="s in getLiffStatus()"
        :key="s.label"
      )
        td.text-left
          | {{ s.label }}
        td.text-left
          | {{ s.value }}

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import {
  isLiffLoggedIn,
  getOS,
  getLiffLanguage,
  isInClient,
  getLiffAccessToken
} from '~/plugins/liff'

@Component
export default class LiffFunctions extends Vue {
  getLiffStatus(): object[] {
    return [
      { label: 'OS', value: getOS() },
      { label: 'Language', value: getLiffLanguage() },
      { label: 'In App browser', value: isInClient() },
      { label: 'LoggedIn', value: isLiffLoggedIn() },
      { label: 'Access token', value: getLiffAccessToken() }
    ]
  }
}
</script>
