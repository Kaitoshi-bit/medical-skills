<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Пациенты</h1>
      <v-btn color="primary" @click="dialog = true">+ Новый пациент</v-btn>
    </div>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="search" label="Поиск" prepend-inner-icon="mdi-magnify" clearable />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="patient in filteredPatients" :key="patient.id" cols="12" md="6" lg="4">
        <PatientCard :patient="patient" />
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Новый пациент</v-card-title>
        <v-card-text>
          <v-text-field v-model="newPatient.firstName" label="Имя" />
          <v-text-field v-model="newPatient.lastName" label="Фамилия" />
          <v-text-field v-model="newPatient.diagnosis" label="Диагноз" />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="createPatient">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { usePatientStore } from '~/stores/patients'
import PatientCard from '~/components/patient/PatientCard.vue'

const patientStore = usePatientStore()
const search = ref('')
const dialog = ref(false)
const newPatient = ref({ firstName: '', lastName: '', diagnosis: '' })

const filteredPatients = computed(() => {
  if (!search.value) return patientStore.patients
  const q = search.value.toLowerCase()
  return patientStore.patients.filter(p => 
    p.firstName.toLowerCase().includes(q) || 
    p.lastName.toLowerCase().includes(q) ||
    p.diagnosis.toLowerCase().includes(q)
  )
})

const createPatient = () => {
  if (newPatient.value.firstName && newPatient.value.lastName) {
    patientStore.addPatient({
      ...newPatient.value,
      injuries: [],
      treatmentPlan: { exercises: [], medications: [] },
      notes: [],
      exerciseProgress: {}
    })
    dialog.value = false
    newPatient.value = { firstName: '', lastName: '', diagnosis: '' }
  }
}

onMounted(() => patientStore.loadPatients())
</script>