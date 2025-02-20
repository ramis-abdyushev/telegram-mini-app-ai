<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background-color: var(--color-heading);
  color: var(--color-background);
  cursor: pointer;
}

button:hover {
  background-color: var(--color-text);
}
</style>
