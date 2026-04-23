<template>
  <div v-if="patient">
    <v-btn to="/patients" variant="text" prepend-icon="mdi-arrow-left" class="mb-4">Назад</v-btn>
    <v-tabs v-model="tab">
      <v-tab value="info">Инфо</v-tab>
      <v-tab value="injuries">Травмы</v-tab>
      <v-tab value="treatment">Лечение</v-tab>
      <v-tab value="exercises">Упражнения</v-tab>
      <v-tab value="notes">Заметки</v-tab>
      <v-tab value="reminders">Напоминания</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="info">
        <PatientInfo :patient="patient" class="mt-4" />
      </v-window-item>
      <v-window-item value="injuries">
        <InjuryTimeline :injuries="patient.injuries" class="mt-4" />
      </v-window-item>
      <v-window-item value="treatment">
        <TreatmentPlan :plan="patient.treatmentPlan" class="mt-4" />
      </v-window-item>
      <v-window-item value="exercises">
        <ExerciseTracker 
          :exercises="assignedExercises" 
          :progress="patient.exerciseProgress"
          :patientId="patient.id"
          @updateProgress="updateProgress"
          class="mt-4" />
      </v-window-item>
      <v-window-item value="notes">
        <MedicalNotes :notes="patient.notes" :patientId="patient.id" @addNote="addNote" class="mt-4" />
      </v-window-item>
      <v-window-item value="reminders">
        <ReminderList :reminders="patientReminders" @toggle="toggleReminder" @delete="deleteReminder" class="mt-4" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { usePatientStore } from '~/stores/patients'
import { useExerciseStore } from '~/stores/exercises'
import { useReminderStore } from '~/stores/reminders'
import PatientInfo from '~/components/patient/PatientInfo.vue'
import InjuryTimeline from '~/components/patient/InjuryTimeline.vue'
import TreatmentPlan from '~/components/patient/TreatmentPlan.vue'
import ExerciseTracker from '~/components/exercises/ExerciseTracker.vue'
import MedicalNotes from '~/components/patient/MedicalNotes.vue'
import ReminderList from '~/components/reminders/ReminderList.vue'

const route = useRoute()
const patientStore = usePatientStore()
const exerciseStore = useExerciseStore()
const reminderStore = useReminderStore()
const tab = ref('info')

const patient = computed(() => patientStore.patients.find(p => p.id === parseInt(route.params.id)))

const assignedExercises = computed(() => {
  const ids = patient.value?.treatmentPlan?.exercises || []
  return ids.map(id => exerciseStore.getExerciseById(id)).filter(Boolean)
})

const patientReminders = computed(() => 
  reminderStore.reminders.filter(r => r.patientId === patient.value?.id)
)

const updateProgress = (exerciseId, delta) => {
  patientStore.updateExerciseProgress(patient.value.id, exerciseId, delta)
}

const addNote = (note) => {
  patientStore.addNote(patient.value.id, note)
}

const toggleReminder = (id) => {
  reminderStore.toggleCompleted(id)
}

const deleteReminder = (id) => {
  reminderStore.deleteReminder(id)
}

onMounted(() => {
  patientStore.loadPatients()
  exerciseStore.loadExercises()
  reminderStore.loadReminders()
})
</script>