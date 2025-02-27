const maxLengthChunk = 30;

export async function addMessageToChat(message) {
  const cloudStorage = window.Telegram.WebApp.CloudStorage

  // Строка, которую нужно сохранить
  const messageStr = JSON.stringify(message) + ',';

  // Получаем количество сохранённых частей чата
  const countStr = await cloudStorage.getItem('chat_count');

  let newChat = false;

  if (!countStr) {
    newChat = true
  }

  let chatCount = newChat ? 1 : Number(countStr);

  const lastChunkStr = newChat ? '' : await cloudStorage.getItem(`chat_${chatCount}`);

  const availableLength = maxLengthChunk - lastChunkStr.length;

  const addedChunks = splitString(messageStr, availableLength)

  addedChunks.forEach((value, index) => {
    if (index === 0) {
      value = lastChunkStr + value
    }

    cloudStorage.setItem(`chat_${chatCount}`, value);
    cloudStorage.setItem(`chat_count`, String(chatCount));

    chatCount++
  })
}

function splitString(string, firstChunkLength) {
  let result = [];
  let remaining = string;

  // Добавляем первый кусок, длина которого определяется пользователем
  let firstChunk = remaining.slice(0, firstChunkLength);
  result.push(firstChunk);
  remaining = remaining.slice(firstChunkLength);

  // Разбиваем оставшуюся строку на куски по maxChunkLength
  while (remaining.length > maxLengthChunk) {
    let chunk = remaining.slice(0, maxLengthChunk);
    result.push(chunk);
    remaining = remaining.slice(maxLengthChunk);
  }

  // Добавляем последний кусок (меньше maxChunkLength, если нужно)
  if (remaining.length > 0) {
    result.push(remaining);
  }

  return result;
}
