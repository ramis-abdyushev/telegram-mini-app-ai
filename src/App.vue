<script setup>
import ChatContainer from '@/components/ChatContainer.vue'
import SelectModel from '@/components/ModelSelect.vue'

const cloudStorage = window.Telegram.WebApp.CloudStorage

cloudStorage.setItem('chat', 'Ура')
cloudStorage.setItem('chat1', JSON.stringify([{ asd: 'Ура' }, { sss: 'Да', ff: 123 }]))

cloudStorage.getKeys((err, keys) => {
  console.log('err', err)
  console.log('keys', keys)
})

cloudStorage.getItem('chat', (err, value) => {
  console.log('err1', err)
  console.log('value1', value)
})

cloudStorage.getItem('chat1', (err, value) => {
  console.log('err2', err)
  console.log('value2', value)
  console.log('value3', JSON.parse(value))
})
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
