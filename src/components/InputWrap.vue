<script setup>
import IconButton from '@/components/ui/IconButton.vue'
import CustomTextarea from '@/components/ui/CustomTextarea.vue'
import { onMounted, ref } from 'vue'
import { useModelStore } from '@/stores/model.js'
import { useMessagesStore } from '@/stores/messages.js'
import IconArrow from '@/components/icons/IconArrow.vue'

const emit = defineEmits(['add-message'])

const messagesStore = useMessagesStore()
const modelStore = useModelStore()

const inputValue = ref('')
const loading = ref(false)

const textareaRef = ref(null)

onMounted(() => textareaRef.value.focus())

const sendMessage = async () => {
  const userInput = inputValue.value.trim()

  if (!userInput) {
    return
  }

  const userMessage = { role: 'user', content: userInput }
  addMessage(userMessage)

  inputValue.value = ''
  loading.value = true

  const selectedModel = modelStore.currentModel
  console.log(selectedModel)

  try {
    const aiMessage = await new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            role: 'assistant',
            content: userInput,
          }),
        1000,
      ),
    )

    addMessage(aiMessage)
  } catch (error) {
    console.error('Ошибка запроса:', error)
    addMessage({ role: 'assistant', content: 'Ошибка запроса' })
  }

  loading.value = false
}

const addMessage = (message) => {
  messagesStore.addMessage(message)
  emit('add-message')
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
    <IconButton class="input-button" :disabled="loading" @click="sendMessage">
      <IconArrow />
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
