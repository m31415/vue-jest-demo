<script setup lang="ts">
import type { Data } from "../../types/passing/nested-conditional-prop";

const { title, item } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ item }}</div>
</template>
