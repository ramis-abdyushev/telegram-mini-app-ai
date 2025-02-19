<script setup>
import ChatContainer from '@/components/ChatContainer.vue'
import SelectModel from '@/components/SelectModel.vue'
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
  height: 50px;
  padding: 1rem;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 1rem;
}
</style>
