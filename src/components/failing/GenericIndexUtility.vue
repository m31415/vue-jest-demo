<script setup lang="ts">
import type { Data } from "../../types/failing/generic-index-utility";

const { title, description } = defineProps<Data["props"]>();
</script>

<template>
  <div>{{ title }} - {{ description }}</div>
</template>
