<script setup lang="ts">
import type { Data } from "../../types/failing/generic-index-intersection";

const { title, count } = defineProps<Data["props"]>();
</script>

<template>
  <div>{{ title }} - {{ count }}</div>
</template>
