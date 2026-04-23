<template>
  <v-card>
    <v-card-title>Напоминания</v-card-title>
    <v-divider />
    <v-list>
      <v-list-item v-for="rem in reminders" :key="rem.id">
        <template v-slot:prepend>
          <v-checkbox-btn :model-value="rem.completed" @update:model-value="toggle(rem.id)" />
        </template>
        <v-list-item-title :class="{ 'text-decoration-line-through': rem.completed }">{{ rem.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ formatDate(rem.datetime) }} — {{ getPatientName(rem.patientId) }}</v-list-item-subtitle>
        <template v-slot:append>
          <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteRem(rem.id)" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { usePatientStore } from '~/stores/patients'

const props = defineProps({ reminders: Array })
const emit = defineEmits(['toggle', 'delete'])
const patientStore = usePatientStore()

const getPatientName = (id) => {
  const p = patientStore.patients.find(p => p.id === id)
  return p ? `${p.firstName} ${p.lastName}` : '—'
}
const formatDate = (iso) => new Date(iso).toLocaleString()
const toggle = (id) => emit('toggle', id)
const deleteRem = (id) => emit('delete', id)
</script>