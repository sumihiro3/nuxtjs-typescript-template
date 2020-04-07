<template lang="pug">
  v-container
    v-flex(mb-4 xl12 lg12 md12 sm12 xs12)
      div.ma-4(xl4 lg4 md4 sm6 xs6)
        v-btn.custom-transform-class.text-none(
          rounded
          color="success"
          @click="openWindow"
        )
          | openWindow
      div.ma-4(xl4 lg4 md4 sm6 xs6)
        v-btn.custom-transform-class.text-none(
          rounded
          :disabled="isInClient === false"
          color="success"
          @click="sendMessage"
        )
          | sendMessage
      div.ma-4(xl4 lg4 md4 sm6 xs6)
        v-btn.custom-transform-class.text-none(
          rounded
          :disabled="isInClient === false"
          color="success"
          @click="scanCode"
        )
          | scanCode
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class LiffApis extends Vue {
  @Prop() readonly isInClient: boolean = false
  @Prop() readonly os: string = ''

  openWindow() {
    this.$emit('openWindow')
  }

  sendMessage() {
    this.$emit('sendMessage')
  }

  scanCode() {
    this.$emit('scanCode')
  }
}
</script>
