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
  <div class="messages-wrap" ref="messagesRef">
    <div class="messages">
      <div class="message" v-for="msg in messages" :key="msg.content" :class="msg.role">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages-wrap {
  min-height: 0;
  flex-grow: 1;
  overflow-y: auto;
}

.messages {
  width: 736px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.message {
  margin: 10px 0;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.user {
  max-width: 70%;
  align-self: flex-end;
  padding: 0.625rem 1.25rem;
  border-radius: 1.5rem;
  background-color: var(--color-background-mute);
}

@media (max-width: 1279px) {
  .messages {
    width: 608px;
  }
}

@media (max-width: 1023px) {
  .messages {
    width: 100%;
  }
}
</style>
