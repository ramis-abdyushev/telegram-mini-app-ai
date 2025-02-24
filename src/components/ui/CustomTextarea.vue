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
    console.log(event)

    if (event.shiftKey) {
      return
    }
    event.preventDefault()
    emit('keydown-send')
  }
}

const focus = () => {
  textareaRef.value.focus()
}

defineExpose({ focus })
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
  max-height: 25dvh;
  flex-grow: 1;
  border: none;
  outline: none;
  resize: none;
  background: none;
  font: inherit;
  line-height: 1.5;
  color: var(--color-text);
}
</style>
