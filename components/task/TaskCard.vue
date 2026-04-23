<template>
  <v-card class="task-card fade-up" :to="`/tasks/${task.id}`">
    <v-card-title class="text-h6 font-weight-bold pb-1">
      <span class="marker-square"></span>
      {{ task.title }}
      <v-chip :color="difficultyColor" size="small" class="ml-2" variant="tonal">
        {{ difficultyLabel }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle class="text-subtitle-2">
      <v-icon icon="mdi-stethoscope" size="14" class="mr-1" /> {{ task.specialty }} •
      <v-icon icon="mdi-star" size="14" class="mr-1" color="#C41E3A" /> {{ task.points }} очков
    </v-card-subtitle>
    <v-card-text class="text-body-2 mt-2">
      {{ truncate(task.description, 200) }}
    </v-card-text>
    <v-card-actions>
      <v-btn variant="flat" color="primary" class="red-btn">Решить кейс →</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  task: Object
})

const difficultyColor = computed(() => {
  if (props.task.difficulty === 'easy') return '#2E7D32'
  if (props.task.difficulty === 'medium') return '#F5A623'
  return '#C41E3A'
})

const difficultyLabel = computed(() => {
  if (props.task.difficulty === 'easy') return 'Лёгкая'
  if (props.task.difficulty === 'medium') return 'Средняя'
  return 'Сложная'
})

const truncate = (text, length) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}
</script>

<style scoped>
.task-card {
  background: #1A1A1A !important;
  color: #FFFFFF !important;
  border: 2px solid #1A1A1A;
  border-radius: 0 !important;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  transform: rotate(0deg);
  margin-bottom: 20px;
}
.task-card:hover {
  transform: translateY(-6px) scale(1.01) rotate(-0.5deg);
  box-shadow: 12px 16px 24px rgba(0,0,0,0.2);
  border-color: #C41E3A;
}
.marker-square {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #C41E3A;
  margin-right: 10px;
  vertical-align: middle;
}
.red-btn {
  background: #C41E3A !important;
  color: white !important;
  border-radius: 0 !important;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  transition: all 0.2s ease;
}
.red-btn:hover {
  background: #a01830 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}
@media (max-width: 768px) {
  .task-card { margin-bottom: 16px; }
  .task-card:hover { transform: translateY(-3px) scale(1.01); }
}
</style>