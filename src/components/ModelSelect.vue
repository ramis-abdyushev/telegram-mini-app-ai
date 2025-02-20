<script setup>
import SelectApp from '@/components/ui/CustomSelect.vue'
import { useModelStore } from '@/stores/model.js'
import { storeToRefs } from 'pinia'

const models = [
  { label: 'Model 1', value: 'model-1' },
  { label: 'Model 2', value: 'model-2' },
  { label: 'Model 3', value: 'model-3' },
  { label: 'Model 4', value: 'model-4' },
]

const modelStore = useModelStore()
const { currentModel } = storeToRefs(modelStore)
</script>

<template>
  <SelectApp v-model:value="currentModel" :options="models" />
</template>
