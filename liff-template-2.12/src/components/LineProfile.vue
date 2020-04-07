<template lang="pug">
  v-container
    v-flex(mb-8 xs12 v-show="lineProfile")
      p.subheading.font-weight-regular
        | Welcome! 
        | {{ lineProfile.displayName }}
      div
        v-avatar(
          color="teal"
          size="128"
        )
          img(
            :src="lineProfile.pictureUrl"
          )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Profile } from '@line/bot-sdk'

@Component
export default class LineProfile extends Vue {
  @Prop() lineProfile!: Profile
}
</script>
