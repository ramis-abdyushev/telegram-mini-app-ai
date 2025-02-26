import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModelStore = defineStore('modelStore', () => {
  const currentModel = ref('llama3.2')

  return { currentModel }
})
