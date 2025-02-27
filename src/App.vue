<script setup>
import ChatContainer from '@/components/ChatContainer.vue'
import SelectModel from '@/components/ModelSelect.vue'
import DeleteButton from '@/components/DeleteButton.vue'
</script>

<template>
  <header>
    <SelectModel />
    <DeleteButton />
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
  justify-content: space-between;
  padding: 0.75rem;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
