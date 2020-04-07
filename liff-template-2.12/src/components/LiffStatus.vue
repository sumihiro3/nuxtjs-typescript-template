<template lang="pug">
  v-container(fluid)
    h2.headline.text-left.font-italic.pt-2
      | Status
    v-divider
    v-simple-table(max-width="90%")
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
          td.text-left(xs6)
            | {{ s.label }}
          td.text-left.text-truncate(
            style="max-width: 200px;"
            xs6
          )
            | {{ s.value }}

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import {
  isLineLoggedIn,
  getOS,
  getLiffLanguage,
  isInClient,
  getLiffAccessToken
} from '~/plugins/liff'

@Component
export default class LiffStatus extends Vue {
  getLiffStatus(): object[] {
    return [
      { label: 'OS', value: getOS() },
      { label: 'Language', value: getLiffLanguage() },
      { label: 'In App browser', value: isInClient() },
      { label: 'LoggedIn', value: isLineLoggedIn() },
      { label: 'Access token', value: getLiffAccessToken() }
    ]
  }
}
</script>
