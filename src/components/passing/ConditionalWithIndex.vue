<script setup lang="ts">
import type { Data } from "../../types/passing/conditional-with-index";

const { title, content } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ content }}</div>
</template>
