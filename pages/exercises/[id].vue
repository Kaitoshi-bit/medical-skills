<template>
  <div v-if="exercise">
    <v-btn to="/exercises" variant="text" prepend-icon="mdi-arrow-left" class="mb-4">Назад</v-btn>
    <v-card>
      <v-card-title>{{ exercise.name }}</v-card-title>
      <v-card-subtitle>Сложность: {{ difficultyText }}</v-card-subtitle>
      <v-divider />
      <v-card-text>
        <p><strong>Инструкция:</strong> {{ exercise.instructions }}</p>
        <p><strong>Подходы:</strong> {{ exercise.sets }}</p>
        <p><strong>Повторения:</strong> {{ exercise.reps }}</p>
        <p><strong>Примерная длительность:</strong> {{ exercise.duration }} мин</p>
        <v-btn color="primary" @click="assignToPatientDialog = true">Назначить пациенту</v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="assignToPatientDialog" max-width="400">
      <v-card>
        <v-card-title>Назначить упражнение пациенту</v-card-title>
        <v-select v-model="selectedPatientId" :items="patientOptions" item-title="label" item-value="id" label="Пациент" />
        <v-card-actions>
          <v-btn variant="text" @click="assignToPatientDialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="assignExercise">Назначить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useExerciseStore } from '~/stores/exercises'
import { usePatientStore } from '~/stores/patients'

const route = useRoute()
const exerciseStore = useExerciseStore()
const patientStore = usePatientStore()
const assignToPatientDialog = ref(false)
const selectedPatientId = ref(null)

const exercise = computed(() => exerciseStore.getExerciseById(parseInt(route.params.id)))
const difficultyText = computed(() => {
  const map = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' }
  return map[exercise.value?.difficulty] || ''
})
const patientOptions = computed(() => 
  patientStore.patients.map(p => ({ label: `${p.firstName} ${p.lastName}`, id: p.id }))
)

const assignExercise = () => {
  if (selectedPatientId.value && exercise.value) {
    const patient = patientStore.patients.find(p => p.id === selectedPatientId.value)
    if (patient && !patient.treatmentPlan.exercises.includes(exercise.value.id)) {
      patient.treatmentPlan.exercises.push(exercise.value.id)
      patientStore.updatePatient(patient.id, { treatmentPlan: patient.treatmentPlan })
      assignToPatientDialog.value = false
      selectedPatientId.value = null
    }
  }
}

onMounted(() => {
  exerciseStore.loadExercises()
  patientStore.loadPatients()
})
</script>