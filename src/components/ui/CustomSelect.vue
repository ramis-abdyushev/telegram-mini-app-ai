<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import IconSelectCaret from '@/components/icons/IconSelectCaret.vue'

const { options, value } = defineProps({
  options: {
    type: Array,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:value'])

const isOpen = ref(false)
const buttonRef = ref(null)

const selectedLabel = computed(
  () => options.find((option) => option.value === value)?.label || 'Не выбрано',
)

onMounted(() => document.addEventListener('click', clickOutside))
onUnmounted(() => document.removeEventListener('click', clickOutside))

const toggleSelect = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('update:value', option.value)
  isOpen.value = false
}

const clickOutside = (event) => {
  if (!buttonRef.value?.contains(event.target)) {
    isOpen.value = false
  }
}
</script>

<template>
  <div class="custom-select">
    <button
      ref="buttonRef"
      class="select-button"
      :class="{ 'is-open': isOpen }"
      @click="toggleSelect"
    >
      <span>{{ selectedLabel }}</span>
      <IconSelectCaret />
    </button>
    <ul v-show="isOpen" class="select-options" @click.stop>
      <li
        v-for="option in options"
        :key="option.value"
        class="select-option"
        @click.stop="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
}

.select-button {
  display: inline-flex;
  align-items: center;
  padding: .375rem .75rem;
  border: none;
  border-radius: .5rem;
  font: inherit;
  font-size: 1.125rem;
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
}

.select-button:hover,
.select-button.is-open {
  background-color: var(--color-background-soft);
}

.select-button > svg {
  width: 18px;
  height: 18px;
  margin-left: .25rem;
}

.select-options {
  position: absolute;
  margin-top: .5rem;
  padding: .5rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background-color: var(--color-background-soft);
  list-style-type: none;
}

.select-option {
  cursor: pointer;
  padding: .375rem .75rem;
  border-radius: .375rem;
}

.select-option:hover {
  background-color: var(--color-background-mute);
}
</style>
