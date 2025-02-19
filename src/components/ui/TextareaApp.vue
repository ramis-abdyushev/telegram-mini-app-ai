<script setup>
import { nextTick, ref, watch } from 'vue'

const { value } = defineProps({
  value: {
    type: String,
  },
  placeholder: {
    type: String,
  },
})

const emit = defineEmits(['update:value', 'send'])

const textarea = ref(null)

watch(
  () => value,
  () => {
    resize()
  },
)

const onChangeHandler = (e) => {
  emit('update:value', e.target.value)
}

const resize = () => {
  nextTick(() => {
    const el = textarea.value
    if (el) {
      el.style.height = 'auto' // Сброс высоты
      el.style.height = el.scrollHeight + 'px'
    }
  })
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      return
    }
    event.preventDefault()
    emit('send')
  }
}
</script>

<template>
  <textarea
    ref="textarea"
    :value
    @input="onChangeHandler"
    :placeholder
    rows="1"
    @keydown="handleKeyDown"
  />
</template>

<style scoped>
textarea {
  resize: none;
  background: none;
  border: none;
  flex: 1;
  padding: 5px;
  border-radius: 5px;
  font: inherit;
  outline: none;
  max-height: 230px;
}
</style>
