<script setup lang="ts">
import type { Data } from "../../types/failing/conditional";

const { message } = defineProps<Data>();
</script>

<template>
  <div>{{ message }}</div>
</template>
