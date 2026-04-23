<template>
  <v-card>
    <v-card-title>Трекинг упражнений</v-card-title>
    <v-divider />
    <v-list>
      <v-list-item v-for="ex in exercises" :key="ex.id">
        <v-list-item-title>{{ ex.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ ex.sets }} x {{ ex.reps }} / подходов выполнено: {{ getProgress(ex.id) }}</v-list-item-subtitle>
        <template v-slot:append>
          <v-btn size="small" color="primary" @click="increment(ex.id)">+ подход</v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
const props = defineProps({
  exercises: Array,
  progress: Object,
  patientId: Number
})
const emit = defineEmits(['updateProgress'])

const getProgress = (id) => props.progress?.[id] || 0
const increment = (id) => emit('updateProgress', id, 1)
</script>