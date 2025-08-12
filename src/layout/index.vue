<template>
  <div class="pages">
    <!-- <NagivationHead />
    <NagivationAside v-if="isHome" /> -->
    <PlatHeader />
    <div class="pages-content">
      <RouterView></RouterView>
    </div>
    <!-- <NagivationFooter />
    <FooterTools /> -->
  </div>
</template>

<script setup lang="ts">
// import NagivationHead from "@/components/NagivationHead/index.vue";
// import NagivationAside from "@/components/NagivationAside/index.vue";
// import NagivationFooter from "@/components/NagivationFooter/index.vue";
// import FooterTools from "@/components/FooterTools/index.vue";
import PlatHeader from "@/components/PlatHeader/index.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<style scoped lang="scss">
.pages {
  height: 100%;
  width: 100%;
}
</style>
