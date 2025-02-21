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
const state = ref('question')

const textareaRef = ref(null)

onMounted(() => textareaRef.value.focus())

const sendMessage = async () => {
  const userInput = inputValue.value.trim()

  if (!userInput || ['pending', 'response'].includes(state.value)) {
    return
  }

  const userMessage = { role: 'user', content: userInput }
  addMessage(userMessage)

  inputValue.value = ''
  state.value = 'pending'

  await new Promise((resolve) => setTimeout(() => resolve(), 1000))

  const selectedModel = modelStore.currentModel
  console.log(selectedModel)

  try {
    const aiMessage = await new Promise((resolve) => {
      state.value = 'response'

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

  state.value = 'question'
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
    <IconButton
      v-if="state === 'question'"
      class="input-button"
      :disabled="!inputValue.trim()"
      @click="sendMessage"
    >
      <IconArrow />
    </IconButton>
    <IconButton v-else-if="state === 'pending'" class="input-button" disabled>
      <IconSpinner />
    </IconButton>
    <IconButton v-else class="input-button" @click="stopSendMessage">
      <IconSquare />
    </IconButton>
  </div>
</template>

<style scoped>
.input-wrap {
  width: 776px;
  margin: auto;
  border-radius: 24px;
  background-color: #303030;
  padding: 12px;
  display: flex;
  align-items: center;
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
