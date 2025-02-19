import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessagesStore = defineStore('messagesStore', () => {
  const messages = ref([
    { role: 'user', content: 'Привет!' },
    {
      role: 'assistant',
      content:
        'Вроде работает, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100',
    },
    { role: 'user', content: 'Тест тест вот ещё тест' },
    {
      role: 'assistant',
      content:
        'Вроде работает, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100, ещё текста lorem100',
    },
  ])

  const addMessage = (message) => {
    messages.value.push(message)
  }

  return { messages, addMessage }
})
