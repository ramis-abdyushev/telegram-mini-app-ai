import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessagesStore = defineStore('messagesStore', () => {
  const messages = ref([])

  const setMessages = (message) => {
    messages.value = message
  }

  const addMessage = (message) => {
    messages.value.push(message)
  }

  const updateLastAssistantMessage = (messagePart) => {
    const lastMessage = messages.value[messages.value.length - 1]
    if (lastMessage.role === 'assistant') {
      lastMessage.content += messagePart
    } else {
      addMessage({ role: 'assistant', content: messagePart })
    }
  }

  return { messages, setMessages, addMessage, updateLastAssistantMessage }
})
