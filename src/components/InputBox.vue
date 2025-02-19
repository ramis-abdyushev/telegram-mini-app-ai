<script setup>
import ButtonApp from '@/components/ui/ButtonApp.vue'
import TextareaApp from '@/components/ui/TextareaApp.vue'
import { ref } from 'vue'
import { useModelStore } from '@/stores/currentModel.js'
import { useMessagesStore } from '@/stores/messages.js'

const emit = defineEmits(['send-message'])

const messagesStore = useMessagesStore()
const { addMessage } = messagesStore
const addMessageScroll = (message) => {
  addMessage(message)
  emit('send-message')
}

const userInput = ref('')

const loading = ref(false)

const modelStore = useModelStore()

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  const userMessage = { role: 'user', content: userInput.value }
  userInput.value = ''
  loading.value = true
  addMessageScroll(userMessage)

  const selectedModel = modelStore.currentModel
  console.log(selectedModel)

  try {
    const aiMessage = {
      role: 'assistant',
      content:
        'Вроде работает, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100',
    }
    addMessageScroll(aiMessage)
  } catch (error) {
    console.error('Ошибка запроса:', error)
    addMessageScroll({ role: 'assistant', content: 'Ошибка запроса' })
  }

  loading.value = false
}
</script>

<template>
  <div class="input-box">
    <TextareaApp v-model:value="userInput" @send="sendMessage" placeholder="Введите сообщение..." />
    <ButtonApp @click="sendMessage(userInput)" :disabled="loading" text="Отправить" />
  </div>
</template>

<style scoped>
.input-box {
  width: 776px;
  margin: auto;
  border-radius: 24px;
  background-color: #303030;
  padding: 12px 12px;
  display: flex;
  align-items: end;
}
</style>
