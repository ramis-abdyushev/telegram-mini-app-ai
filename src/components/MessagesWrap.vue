<script setup>
import { storeToRefs } from 'pinia'
import { useMessagesStore } from '@/stores/messages.js'
import { nextTick, ref, watch } from 'vue'

const messagesStore = useMessagesStore()
const { messages } = storeToRefs(messagesStore)

const messagesRef = ref(null)

watch(
  () => messages,
  () => scrollMessages(),
  { deep: true },
)

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
  padding-bottom: 2rem;
  overflow-y: auto;
}

.messages {
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0 1.5rem;
}

.message {
  margin: 18px 1rem;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.user {
  max-width: 70%;
  align-self: flex-end;
  padding: 0.625rem 1.25rem;
  border-radius: 1.5rem;
  line-height: 1.5;
  background-color: var(--color-background-mute);
}

@media (min-width: 1024px) {
  .messages {
    max-width: 40rem;
  }
}

@media (min-width: 1280px) {
  .messages {
    max-width: 48rem;
  }
}
</style>
