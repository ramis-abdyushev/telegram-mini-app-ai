<script setup>
import { ref } from 'vue'
import InputBox from '@/components/InputBox.vue'
import MessagesBox from '@/components/MessagesBox.vue'

const messagesBoxRef = ref(null)

const handleSendMessage = () => {
  messagesBoxRef.value.scrollMessages()
}
</script>

<template>
  <MessagesBox ref="messagesBoxRef" />
  <InputBox @send-message="handleSendMessage" />
</template>
