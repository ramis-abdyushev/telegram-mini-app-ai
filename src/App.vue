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
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0.75rem;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 1rem;
}
</style>
