<script setup lang="ts">
import type { Data } from "../../types/passing/index-access-intersection";

const { title, count } = defineProps<Data["props"]>();
</script>

<template>
  <div>{{ title }} - {{ count }}</div>
</template>
