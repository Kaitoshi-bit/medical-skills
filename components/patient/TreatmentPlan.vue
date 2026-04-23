<template>
  <v-card>
    <v-card-title>План лечения</v-card-title>
    <v-divider />
    <v-card-text>
      <v-list>
        <v-list-item><strong>Начало:</strong> {{ plan.startDate }}</v-list-item>
        <v-list-item><strong>Окончание:</strong> {{ plan.endDate }}</v-list-item>
        <v-list-item><strong>Лекарства:</strong> {{ plan.medications?.join(', ') || '—' }}</v-list-item>
        <v-list-item><strong>Упражнения:</strong>
          <v-chip-group>
            <v-chip v-for="exId in plan.exercises" :key="exId" size="small" :to="`/exercises/${exId}`">
              {{ getExerciseName(exId) }}
            </v-chip>
          </v-chip-group>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises'

const props = defineProps({ plan: Object })
const exerciseStore = useExerciseStore()
const getExerciseName = (id) => exerciseStore.getExerciseById(id)?.name || '—'
</script>