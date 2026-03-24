<script setup lang="ts">
import type { Data } from "../../types/passing/generic-conditional-single-prop";

const { title, value } = defineProps<Data["props"]>();
</script>

<template>
  <div>{{ title }} - {{ value }}</div>
</template>
