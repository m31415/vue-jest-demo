<script setup lang="ts">
import type { Data } from "../../types/failing/mapped";

const { title, count } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ count }}</div>
</template>
