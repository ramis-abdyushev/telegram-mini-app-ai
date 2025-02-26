<script setup>
import CustomSelect from '@/components/ui/CustomSelect.vue'
import { useModelStore } from '@/stores/model.js'
import { storeToRefs } from 'pinia'

const models = [
  { label: 'deepseek-r1', value: 'deepseek-r1' },
  { label: 'llama3.2', value: 'llama3.2' },
]

const modelStore = useModelStore()
const { currentModel } = storeToRefs(modelStore)
</script>

<template>
  <CustomSelect v-model:value="currentModel" :options="models" />
</template>
