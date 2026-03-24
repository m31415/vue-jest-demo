<script setup lang="ts">
import type { Data } from "../../types/passing/generic";

const { title } = defineProps<Data>();
</script>

<template>
  <span :class="['data']">
    {{ title }}
  </span>
</template>
