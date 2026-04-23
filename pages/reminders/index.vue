<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Напоминания</h1>
      <v-btn color="primary" @click="dialog = true">+ Новое напоминание</v-btn>
    </div>
    <v-row>
      <v-col cols="12" md="4">
        <v-select v-model="filterPatient" :items="patientOptions" label="Пациент" clearable />
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="filterCompleted" :items="[{title:'Все',value:null},{title:'Активные',value:false},{title:'Выполненные',value:true}]" label="Статус" />
      </v-col>
    </v-row>
    <ReminderList :reminders="filteredReminders" @toggle="toggleReminder" @delete="deleteReminder" />

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Новое напоминание</v-card-title>
        <v-card-text>
          <v-select v-model="newReminder.patientId" :items="patientOptions" label="Пациент" />
          <v-text-field v-model="newReminder.title" label="Заголовок" />
          <v-text-field v-model="newReminder.datetime" label="Дата и время" type="datetime-local" />
          <v-select v-model="newReminder.type" :items="['medication','exercise','appointment']" label="Тип" />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="createReminder">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useReminderStore } from '~/stores/reminders'
import { usePatientStore } from '~/stores/patients'
import ReminderList from '~/components/reminders/ReminderList.vue'

const reminderStore = useReminderStore()
const patientStore = usePatientStore()
const filterPatient = ref(null)
const filterCompleted = ref(null)
const dialog = ref(false)
const newReminder = ref({ patientId: null, title: '', datetime: '', type: 'medication' })

const patientOptions = computed(() => 
  patientStore.patients.map(p => ({ label: `${p.firstName} ${p.lastName}`, value: p.id }))
)

const filteredReminders = computed(() => {
  let list = reminderStore.reminders
  if (filterPatient.value) list = list.filter(r => r.patientId === filterPatient.value)
  if (filterCompleted.value !== null) list = list.filter(r => r.completed === filterCompleted.value)
  return list
})

const toggleReminder = (id) => reminderStore.toggleCompleted(id)
const deleteReminder = (id) => reminderStore.deleteReminder(id)

const createReminder = () => {
  if (newReminder.value.patientId && newReminder.value.title && newReminder.value.datetime) {
    reminderStore.addReminder({ ...newReminder.value, completed: false })
    dialog.value = false
    newReminder.value = { patientId: null, title: '', datetime: '', type: 'medication' }
  }
}

onMounted(() => {
  reminderStore.loadReminders()
  patientStore.loadPatients()
})
</script>