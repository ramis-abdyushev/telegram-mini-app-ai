<script setup>
import ChatContainer from '@/components/ChatContainer.vue'
import SelectModel from '@/components/ModelSelect.vue'

const cloudStorage = window.Telegram.WebApp.CloudStorage

const qwe1 = cloudStorage.getKeys((err, keys) => {
  console.log('err1', err)
  console.log('keys1', keys)
})

console.log('qwe1', qwe1)

cloudStorage.setItem('chat', 'Ура')
cloudStorage.setItem('chat1', [{ asd: 'Ура' }, { sss: 'Да', ff: 123 }])

const qwe2 = cloudStorage.getKeys((err, keys) => {
  console.log('err2', err)
  console.log('keys2', keys)
})

console.log('qwe2', qwe2)

console.log('R1', cloudStorage.getItem('chat'))
console.log('R2', cloudStorage.getItem('chat1'))
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
