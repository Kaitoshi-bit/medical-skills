<template>
  <v-card :to="`/exercises/${exercise.id}`" class="mb-3" hover>
    <v-card-title>{{ exercise.name }}</v-card-title>
    <v-card-subtitle>{{ difficultyText }}</v-card-subtitle>
    <v-card-text>{{ exercise.instructions?.slice(0, 80) }}...</v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({ exercise: Object })
const difficultyText = computed(() => {
  const map = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' }
  return map[props.exercise.difficulty] || props.exercise.difficulty
})
</script>