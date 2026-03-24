<script setup lang="ts">
import type { Data } from "../../types/failing/index-access-conditional";

const { message } = defineProps<Data["props"]>();
</script>

<template>
  <div>{{ message }}</div>
</template>
