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

const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

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
    setTimeout(() => console.log(event), 10000)
    setTimeout(() => console.log(navigator.userAgent), 10000)

    if (event.shiftKey || isMobile) {
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
