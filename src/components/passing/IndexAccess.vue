<script setup lang="ts">
import type { Data } from "../../types/passing/index-access";

const { title } = defineProps<Data["props"]>();
</script>

<template>
  <span :class="['data']">
    {{ title }}
  </span>
</template>
