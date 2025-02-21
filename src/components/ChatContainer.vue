<script setup>
import { ref } from 'vue'
import InputWrap from '@/components/InputWrap.vue'
import MessagesWrap from '@/components/MessagesWrap.vue'

const messagesWrapRef = ref(null)

const scrollMessages = () => {
  messagesWrapRef.value.scrollMessages()
}
</script>

<template>
  <MessagesWrap ref="messagesWrapRef" />
  <InputWrap @add-message="scrollMessages" />
</template>
