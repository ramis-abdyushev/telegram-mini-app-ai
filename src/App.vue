<script setup>
import ChatContainer from '@/components/ChatContainer.vue'
import SelectModel from '@/components/ModelSelect.vue'
</script>

<template>
  <header>
    <SelectModel />
  </header>
  <main>
    <ChatContainer />
  </main>
</template>

<style scoped>
header {
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (min-width: 768px) {
  header {
    justify-content: start;
  }
}
</style>
