<template>
  <v-card>
    <v-card-title>Травмы и лечение</v-card-title>
    <v-divider />
    <v-timeline density="compact" align="start">
      <v-timeline-item v-for="injury in injuries" :key="injury.id" :dot-color="getInjuryColor(injury.status)" size="small">
        <div class="text-h6">{{ getInjuryType(injury.type) }}</div>
        <div class="text-caption">Дата: {{ injury.date }}</div>
        <div class="text-caption">Статус: {{ getStatusText(injury.status) }}</div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script setup>
const props = defineProps({
  injuries: Array
})

const getInjuryType = (type) => {
  const map = { collateral_ligament: 'Повреждение связок', tendonitis: 'Тендинит' }
  return map[type] || type
}
const getStatusText = (status) => {
  const map = { treatment: 'Лечение', rehabilitation: 'Реабилитация', closed: 'Закрыта' }
  return map[status] || status
}
const getInjuryColor = (status) => {
  if (status === 'treatment') return 'error'
  if (status === 'rehabilitation') return 'warning'
  return 'success'
}
</script>