<script setup lang="ts">
import AppHeaderMain from "./components/AppHeader/Main.vue";
</script>

<template>
  <div class="app-container">
    <AppHeaderMain />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  width: 100%;
  background-color: var(--bg-color);
  .app-main {
    height: 100%;
    width: 100%;
    max-width: 780px;
    margin: 0 auto;
    padding-top: 56px;
  }
}
</style>
