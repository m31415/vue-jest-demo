<script setup lang="ts">
import type { Data } from "../../types/passing/generic-utility";

const { title, description } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ description }}</div>
</template>
