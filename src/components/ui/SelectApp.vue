<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
  value: {
    type: String,
  },
})

const emit = defineEmits(['update:value'])

const onChangeHandler = (e) => {
  emit('update:value', e.target.value)
}
</script>

<template>
  <select :value @change="onChangeHandler">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
select {
  background-color: transparent;
  cursor: pointer;
  border: none;
  color: var(--color-text);
  outline: none;
  padding: 5px 10px;
  border-radius: 10px;
}

select:hover {
  background-color: var(--color-background-mute);
}

option {
  background-color: var(--color-background-mute);
}
</style>
