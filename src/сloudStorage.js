import { useMessagesStore } from '@/stores/messages.js'

const maxLengthChunk = 4090

const cloudStorage = window.Telegram.WebApp.CloudStorage

function getKeys() {
  return new Promise((resolve, reject) => {
    cloudStorage.getKeys((err, value) => {
      if (err) {
        reject(err); // Если ошибка, отклоняем промис
      } else {
        resolve(value); // Если всё ок, разрешаем промис с ключами
      }
    });
  });
}

function removeItems(keys) {
  return new Promise((resolve, reject) => {
    cloudStorage.removeItems(keys, (err, value) => {
      if (err) {
        reject(err); // Если ошибка, отклоняем промис
      } else {
        resolve(value); // Если всё ок, разрешаем промис с ключами
      }
    });
  });
}

function getItem(key) {
  return new Promise((resolve, reject) => {
    cloudStorage.getItem(key, (err, value) => {
      if (err) {
        reject(err); // Если ошибка, отклоняем промис
      } else {
        resolve(value); // Если всё ок, разрешаем промис с ключами
      }
    });
  });
}

function getItems(keys) {
  return new Promise((resolve, reject) => {
    cloudStorage.getItems(keys, (err, value) => {
      if (err) {
        reject(err); // Если ошибка, отклоняем промис
      } else {
        resolve(value); // Если всё ок, разрешаем промис с ключами
      }
    });
  });
}

function setItem(key, value) {
  return new Promise((resolve, reject) => {
    cloudStorage.setItem(key, value, (err, value) => {
      if (err) {
        reject(err); // Если ошибка, отклоняем промис
      } else {
        resolve(value); // Если всё ок, разрешаем промис с ключами
      }
    });
  });
}

export async function cleanChats() {
  const messagesStore = useMessagesStore()
  messagesStore.setMessages([])
  const allKeys = await getKeys();
  await removeItems(allKeys)
}

export async function addMessageToChat(message) {
  // Строка, которую нужно сохранить
  let messageStr = JSON.stringify(message)

  let newChat = false

  let countStr = await getItem('chat_count')

  if (!countStr) {
    newChat = true
  } else {
    messageStr = ',' + messageStr
  }

  let chatCount = newChat ? 1 : Number(countStr)

  const lastChunkStr = newChat ? '' : await getItem(`chat_${chatCount}`)

  const availableLength = maxLengthChunk - lastChunkStr.length

  const addedChunks = splitString(messageStr, availableLength)

  for (let index = 0; index < addedChunks.length; index++) {
    let value = addedChunks[index];

    if (index === 0) {
      value = lastChunkStr + value
    }

    await setItem(`chat_${chatCount}`, value)
    await setItem(`chat_count`, String(chatCount))

    chatCount++
  }

  const allKeysA = await getKeys();

  console.log('R1', allKeysA)
  console.log('R2', await getItems(allKeysA))
}

function splitString(string, firstChunkLength) {
  let result = []
  let remaining = string

  // Добавляем первый кусок, длина которого определяется пользователем
  let firstChunk = remaining.slice(0, firstChunkLength)
  result.push(firstChunk)
  remaining = remaining.slice(firstChunkLength)

  // Разбиваем оставшуюся строку на куски по maxChunkLength
  while (remaining.length > maxLengthChunk) {
    let chunk = remaining.slice(0, maxLengthChunk)
    result.push(chunk)
    remaining = remaining.slice(maxLengthChunk)
  }

  // Добавляем последний кусок (меньше maxChunkLength, если нужно)
  if (remaining.length > 0) {
    result.push(remaining)
  }

  return result
}

export async function loadChat() {
  const countStr = await getItem('chat_count');

  console.log('RRR', countStr)

  if (!countStr) {
    return
  }

  let count = Number(countStr);
  let fullChat = '';

  for (let i = 1; i <= count; i++) {
    let chunk = await getItem(`chat_${i}`);
    if (chunk) {
      fullChat += chunk;
    }
  }

  console.log('RRR1', fullChat)

  fullChat = `[${fullChat}]`

  const messagesStore = useMessagesStore()
  messagesStore.setMessages(JSON.parse(fullChat))

  console.log('R3', fullChat)
  console.log('R4', JSON.parse(fullChat))
}
