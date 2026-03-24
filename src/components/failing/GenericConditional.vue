<script setup lang="ts">
import type { Data } from "../../types/failing/generic-conditional";

const { message } = defineProps<Data>();
</script>

<template>
  <div>{{ message }}</div>
</template>
