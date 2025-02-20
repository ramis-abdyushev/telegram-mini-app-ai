<script setup>
import { nextTick, ref, watch } from 'vue'

const { value } = defineProps({
  value: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
})

const emit = defineEmits(['update:value', 'keydown-send'])

const textareaRef = ref(null)

watch(
  () => value,
  () => resize(),
)

const resize = () => {
  nextTick(() => {
    const element = textareaRef.value

    element.style.height = 'auto'
    element.style.height = element.scrollHeight + 'px'
  })
}

const inputHandler = (event) => {
  emit('update:value', event.target.value)
}

const keydownHandler = (event) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      return
    }
    event.preventDefault()
    emit('keydown-send')
  }
}

const focusTextarea = () => {
  textareaRef.value.focus()
}

defineExpose({ focusTextarea })
</script>

<template>
  <textarea
    ref="textareaRef"
    :value
    :placeholder
    rows="1"
    @input="inputHandler"
    @keydown="keydownHandler"
  />
</template>

<style scoped>
textarea {
  max-height: 230px;
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  outline: none;
  resize: none;
  background: none;
  font: inherit;
  color: var(--color-text);
}
</style>
