<script setup lang="ts">
import type { Data } from "../../types/passing/union-with-conditional";

const { title, value } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ value }}</div>
</template>
