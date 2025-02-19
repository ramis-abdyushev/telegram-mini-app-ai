<script setup>
import IconArrow from '@/components/icons/IconArrow.vue'
</script>

<template>
  <button><IconArrow /></button>
</template>

<style scoped>
button {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  margin-left: 12px;
  padding: 5px 10px;
  border: none;
  color: var(--color-background-soft);
  cursor: pointer;
  background-color: var(--color-heading);
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: var(--color-text);
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}

button > svg {
  flex-shrink: 0;
}
</style>
