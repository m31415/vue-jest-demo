<script setup lang="ts">
import type { Data } from "../../types/passing/mapped-single-prop";

const { title, userData } = defineProps<Data>();
</script>

<template>
  <div>{{ title }} - {{ userData.name }} ({{ userData.age }})</div>
</template>
