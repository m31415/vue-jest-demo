<script setup lang="ts">
import type { Data } from "../../types/passing/index-access-utility";

const { title, description } = defineProps<Data["props"]>();
</script>

<template>
  <div>{{ title }} - {{ description }}</div>
</template>
