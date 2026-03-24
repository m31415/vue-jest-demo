<script setup lang="ts">
import type { Data } from "../../types/passing/utility";

const { title, description } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ description }}</div>
</template>
