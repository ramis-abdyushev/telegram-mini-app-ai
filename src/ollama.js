import { useModelStore } from '@/stores/model.js'
import { useMessagesStore } from '@/stores/messages.js'
import { Ollama } from 'ollama/browser'
import { addMessageToChat } from '@/сloudStorage.js'

// const ollama = new Ollama({ host: 'https://ollama-chat-ai.serveo.net' })
const ollama = new Ollama({ host: 'https://5f704846e4c7c0.lhr.life/' })

export const sendMessageOllama = async () => {
  const modelStore = useModelStore()
  const messagesStore = useMessagesStore()

  const body = {
    model: modelStore.currentModel,
    messages: messagesStore.messages,
    stream: true
  }

  const response = await ollama.chat(body)

  for await (const part of response) {
    messagesStore.updateLastAssistantMessage(part.message.content)
    if (part.done) {
      addMessageToChat(messagesStore.messages[messagesStore.messages.length - 1])
    }
  }
}
