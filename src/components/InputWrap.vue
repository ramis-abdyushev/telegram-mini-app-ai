<script setup>
import IconButton from '@/components/ui/IconButton.vue'
import CustomTextarea from '@/components/ui/CustomTextarea.vue'
import { onMounted, ref } from 'vue'
import { useModelStore } from '@/stores/model.js'
import { useMessagesStore } from '@/stores/messages.js'
import IconArrow from '@/components/icons/IconArrow.vue'
import IconSquare from '@/components/icons/IconSquare.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'

const emit = defineEmits(['add-message'])

const messagesStore = useMessagesStore()
const modelStore = useModelStore()

const inputValue = ref('')
const messageState = ref('waiting')

const textareaRef = ref(null)

onMounted(() => textareaRef.value.focus())

const sendMessage = async () => {
  const userInput = inputValue.value.trim()

  if (!userInput || ['pending', 'streaming'].includes(messageState.value)) {
    return
  }

  const userMessage = { role: 'user', content: userInput }
  addMessage(userMessage)

  inputValue.value = ''
  messageState.value = 'pending'

  await new Promise((resolve) => setTimeout(() => resolve(), 1000))

  const selectedModel = modelStore.currentModel
  console.log(selectedModel)

  try {
    const aiMessage = await new Promise((resolve) => {
      messageState.value = 'streaming'

      return setTimeout(
        () =>
          resolve({
            role: 'assistant',
            content: userInput,
          }),
        1000,
      )
    })

    addMessage(aiMessage)
  } catch (error) {
    console.error('Ошибка запроса:', error)
    addMessage({ role: 'assistant', content: 'Ошибка запроса' })
  }

  messageState.value = 'waiting'
}

const addMessage = (message) => {
  messagesStore.addMessage(message)
  emit('add-message')
}

const stopSendMessage = () => {
  console.log(1)
}
</script>

<template>
  <div class="input-wrap" @click="textareaRef.focus">
    <CustomTextarea
      ref="textareaRef"
      class="input-textarea"
      v-model:value="inputValue"
      placeholder="Введите сообщение..."
      @keydown-send="sendMessage"
    />
    <div class="input-button">
      <IconButton
        v-if="messageState === 'waiting'"
        :disabled="!inputValue.trim()"
        @click="sendMessage"
      >
        <IconArrow />
      </IconButton>
      <IconButton v-else-if="messageState === 'pending'" disabled>
        <IconSpinner />
      </IconButton>
      <IconButton v-else @click="stopSendMessage">
        <IconSquare />
      </IconButton>
    </div>
  </div>
</template>

<style scoped>
.input-wrap {
  width: 776px;
  margin: auto;
  padding: 12px;
  display: flex;
  align-items: center;
  border-radius: 24px;
  background-color: var(--color-background-mute);
  cursor: text;
}

.input-textarea {
  margin-left: 4px;
}

.input-button {
  align-self: end;
  margin-left: 12px;
}
</style>
