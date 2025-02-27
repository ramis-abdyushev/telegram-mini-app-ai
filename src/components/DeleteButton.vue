<script setup>
import { cleanChats } from '@/сloudStorage.js'
import IconDelete from '@/components/icons/IconDelete.vue'
</script>

<template>
  <button @click="cleanChats">
    <IconDelete />
  </button>
</template>

<style scoped>
button {
  height: 1.75rem;
  width: 1.75rem;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: red;
  background-color: transparent;
  cursor: pointer;
}

button:hover {
  color: darkred;
}
</style>
