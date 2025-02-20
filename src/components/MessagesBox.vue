<script setup>
import { storeToRefs } from 'pinia'
import { useMessagesStore } from '@/stores/messages.js'
import { nextTick, ref } from 'vue'

const messagesStore = useMessagesStore()
const { messages } = storeToRefs(messagesStore)

const messagesRef = ref(null)

const scrollMessages = () => {
  nextTick(() => {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  })
}

defineExpose({ scrollMessages })
</script>

<template>
  <div class="messages-box" ref="messagesRef">
    <div class="messages">
      <div class="message" v-for="msg in messages" :key="msg.content" :class="msg.role">
        <div>
          {{ msg.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages-box {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.messages {
  width: 736px;
  margin: auto;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
}

.message {
  margin: 10px 0;
  white-space: pre-wrap;
}

.user {
  background-color: #303030;
  border-radius: 1.5rem;
  padding: 0.625rem 1.25rem;
  max-width: 70%;
  word-wrap: break-word;
  align-self: flex-end;
  word-break: break-word; /* Разбиваем длинные строки без пробела */
}
</style>
