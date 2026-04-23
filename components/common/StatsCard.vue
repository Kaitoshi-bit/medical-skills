<template>
  <v-card class="pa-4 text-center" color="surface" variant="tonal">
    <v-icon :icon="icon" size="32" color="primary" class="mb-2" />
    <div class="text-h5">{{ value }}</div>
    <div class="text-caption text-grey">{{ title }}</div>
  </v-card>
</template>

<script setup>
defineProps({
  icon: String,
  value: [Number, String],
  title: String
})
</script>