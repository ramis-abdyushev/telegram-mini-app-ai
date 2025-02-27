import { useModelStore } from '@/stores/model.js'
import { useMessagesStore } from '@/stores/messages.js'
import { Ollama } from 'ollama/browser'
import { addMessageToChat } from '@/сloudStorage.js'

// const ollama = new Ollama({ host: 'https://ollama-chat-ai.serveo.net' })
const ollama = new Ollama({ host: 'https://user234633191-3mfvcgm4.tunnel.vk-apps.com' })

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
      await addMessageToChat(messagesStore.messages[messagesStore.messages.length - 1])
    }
  }
}
