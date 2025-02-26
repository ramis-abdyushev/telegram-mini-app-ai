import { useModelStore } from '@/stores/model.js'
import { useMessagesStore } from '@/stores/messages.js'
import { Ollama } from 'ollama/browser'

const ollama = new Ollama({ host: 'https://ollama-chat-ai.serveo.net' })

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
  }
}
