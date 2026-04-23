<template>
  <v-card :to="`/patients/${patient.id}`" class="mb-3" hover>
    <v-card-item>
      <template v-slot:prepend>
        <v-avatar color="primary">
          <span>{{ patient.firstName[0] }}{{ patient.lastName[0] }}</span>
        </v-avatar>
      </template>
      <v-card-title>{{ patient.firstName }} {{ patient.lastName }}</v-card-title>
      <v-card-subtitle>{{ patient.diagnosis }}</v-card-subtitle>
      <template v-slot:append>
        <v-chip :color="injuryStatusColor" size="small">{{ activeInjuryStatus }}</v-chip>
      </template>
    </v-card-item>
  </v-card>
</template>

<script setup>
const props = defineProps({
  patient: Object
})

const activeInjury = computed(() => props.patient.injuries?.find(i => i.status !== 'closed'))
const activeInjuryStatus = computed(() => {
  if (!activeInjury.value) return 'Нет активных'
  const map = { treatment: 'Лечение', rehabilitation: 'Реабилитация' }
  return map[activeInjury.value.status] || activeInjury.value.status
})
const injuryStatusColor = computed(() => {
  if (!activeInjury.value) return 'grey'
  return activeInjury.value.status === 'treatment' ? 'error' : 'warning'
})
</script>