<script setup lang="ts">
import type { Data } from "../../types/passing/intersection";

const { title, count } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ count }}</div>
</template>
