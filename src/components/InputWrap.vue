<script setup>
import IconButton from '@/components/ui/IconButton.vue'
import CustomTextarea from '@/components/ui/CustomTextarea.vue'
import { onMounted, ref } from 'vue'
import { useMessagesStore } from '@/stores/messages.js'
import IconArrow from '@/components/icons/IconArrow.vue'
import IconSquare from '@/components/icons/IconSquare.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'
import { sendMessageOllama } from '@/ollama.js'
import { addMessageToChat } from '@/сloudStorage.js'

const messagesStore = useMessagesStore()
const { addMessage } = messagesStore

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
  addMessageToChat(userMessage)

  inputValue.value = ''
  messageState.value = 'pending'

  await new Promise((resolve) => setTimeout(() => resolve(), 1000))

  try {
    await sendMessageOllama();

    // const aiMessage = await new Promise((resolve) => {
    //   messageState.value = 'streaming'
    //
    //   return setTimeout(
    //     () =>
    //       resolve({
    //         role: 'assistant',
    //         content: userInput,
    //       }),
    //     1000,
    //   )
    // })
  } catch (error) {
    console.error('Ошибка запроса:', error)
    addMessage({ role: 'assistant', content: 'Ошибка запроса' })
  }

  messageState.value = 'waiting'
}

const stopSendMessage = () => {
  console.log(1)
}
</script>

<template>
  <div class="input-wrap" @click="textareaRef.focus">
    <div class="input-box">
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
    </div>
</template>

<style scoped>
.input-wrap {
  padding: 0 .75rem 1rem .75rem;
}

.input-box {
  margin: auto;
  padding: .75rem;
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  background-color: var(--color-background-mute);
  cursor: text;
}

.input-textarea {
  margin-left: .25rem;
}

.input-button {
  align-self: end;
  margin-left: .75rem;
}

@media (min-width: 768px) {
  .input-wrap {
    padding: 0 1.25rem 1rem 1.25rem;
  }
}

@media (min-width: 1024px) {
  .input-box {
    max-width: 40rem;
  }
}

@media (min-width: 1280px) {
  .input-box {
    max-width: 48rem;
  }
}
</style>
