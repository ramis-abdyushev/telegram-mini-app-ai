import { useMessagesStore } from '@/stores/messages.js'

const maxLengthChunk = 2100

const cloudStorage = window.Telegram.WebApp.CloudStorage

function getKeys() {
  return new Promise((resolve, reject) => {
    cloudStorage.getKeys((err, value) => {
      if (err) {
        reject(err) // Если ошибка, отклоняем промис
      } else {
        resolve(value) // Если всё ок, разрешаем промис с ключами
      }
    })
  })
}

function removeItems(keys) {
  return new Promise((resolve, reject) => {
    cloudStorage.removeItems(keys, (err, value) => {
      if (err) {
        reject(err) // Если ошибка, отклоняем промис
      } else {
        resolve(value) // Если всё ок, разрешаем промис с ключами
      }
    })
  })
}

function getItem(key) {
  return new Promise((resolve, reject) => {
    cloudStorage.getItem(key, (err, value) => {
      if (err) {
        reject(err) // Если ошибка, отклоняем промис
      } else {
        resolve(value) // Если всё ок, разрешаем промис с ключами
      }
    })
  })
}

function getItems(keys) {
  return new Promise((resolve, reject) => {
    cloudStorage.getItems(keys, (err, value) => {
      if (err) {
        reject(err) // Если ошибка, отклоняем промис
      } else {
        resolve(value) // Если всё ок, разрешаем промис с ключами
      }
    })
  })
}

function setItem(key, value) {
  return new Promise((resolve, reject) => {
    cloudStorage.setItem(key, value, (err, value) => {
      if (err) {
        reject(err) // Если ошибка, отклоняем промис
      } else {
        resolve(value) // Если всё ок, разрешаем промис с ключами
      }
    })
  })
}

export async function cleanChats() {
  const messagesStore = useMessagesStore()
  messagesStore.setMessages([])
  const allKeys = await getKeys()
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
    let value = addedChunks[index]

    if (index === 0) {
      value = lastChunkStr + value
    }

    try {
      await setItem(`chat_${chatCount}`, value)
    } catch (e) {
      console.error(e)
      console.log(value)

      throw e
    }

    await setItem(`chat_count`, String(chatCount))

    chatCount++
  }

  const allKeysA = await getKeys()

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
  let messs =
    '{"role":"user","content":"Дай большой текст"},{"role":"assistant","content":"Напишите мне, о чем вы хотите написать. Я могу предоставить вам информацию или assisting с созданием текста на любой тему, которая вам интересна."},{"role":"user","content":"Дай большой текст"},{"role":"assistant","content":"Если вы ищете информацию на конкретную тему, я могу предоставить вам подробный текст.\\n\\nЕсли вы хотите ознакомиться с большим текстом по разным темам, я могу предложить следующие варианты:\\n\\n1. Историческая справка: Я могу предоставить вам detailed и историческую информацию о различных событиях, периодах или cultures.\\n2. ФilosOFическая концепция: Я могу объяснить вам сложные философские идеи и концепции на разные темы, такие как этика, логика, психология и более.\\n3. Технологические информации: Я могу предоставить вам подробную информацию о различных технологиях, such как компьютерная техника, мобильная technology, интернет и более.\\n4. Суровые реалности: Я могу рассказать вам об исторических событиях, таких как политические потрясения, военные конфликты, экономические кризисы и более.\\n\\nКоторый раздел вы предпочтет?"},{"role":"user","content":"Дай большой текст"},{"role":"assistant","content":"Я понз наиболее значительных империй в истории: Римская империя. В Риме была создана система государственного управления, которая привела к великим достижениям в области инженерии, architecture и art.\\n*   **Греция**. К where many of the most important philosophical and scientific ideas were developed.\\n\\n**Восток и Далекий Восток**\\n\\nВ средние веки (в 8 веке до н. э.) выросли две великие цивилизации: Китай и Индия. В Китае появилась система государственного управления, которая привела к великим достижениям в области инженерии, architecture и technology.\\n\\n*   **Китай**. В Китае была создана система госукий Восток**\\n\\nВ средние веки (в 8 веке до н. э.) выросли две великие цивилизации: Китай и Индия. В Китае появилась система государственного управления, которая привела к великим достижениям в области инженерии, architecture и technology.\\n\\n*   **Китай**. В Китае была создана система госу'

  try {
    while (true) {
      console.log(messs.length)
      await setItem(`qwe`, messs)
      messs += 'a'
    }
  } catch (e) {
    console.error('Длина', e, messs.length)
  }

  const countStr = await getItem('chat_count')

  console.log('RRR', countStr)

  if (!countStr) {
    return
  }

  let count = Number(countStr)
  let fullChat = ''

  for (let i = 1; i <= count; i++) {
    let chunk = await getItem(`chat_${i}`)
    if (chunk) {
      fullChat += chunk
    }
  }

  console.log('RRR1', fullChat)

  fullChat = `[${fullChat}]`

  const messagesStore = useMessagesStore()
  messagesStore.setMessages(JSON.parse(fullChat))

  console.log('R3', fullChat)
  console.log('R4', JSON.parse(fullChat))
}
