<script setup lang="ts">
import type { Data } from "../../types/passing/conditional-single-prop";

const { title, content } = defineProps<Data>();
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content.message }}</p>
  </div>
</template>
