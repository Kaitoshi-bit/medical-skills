<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Библиотека упражнений</h1>
      <v-btn color="primary" @click="dialog = true">+ Добавить упражнение</v-btn>
    </div>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="search" label="Поиск" prepend-inner-icon="mdi-magnify" clearable />
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="filterDifficulty" :items="difficultyOptions" label="Сложность" clearable />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="ex in filteredExercises" :key="ex.id" cols="12" md="4" lg="3">
        <ExerciseCard :exercise="ex" />
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>Новое упражнение</v-card-title>
        <v-card-text>
          <v-text-field v-model="newExercise.name" label="Название" />
          <v-textarea v-model="newExercise.instructions" label="Инструкция" rows="2" />
          <v-select v-model="newExercise.difficulty" :items="difficultyOptions" label="Сложность" />
          <v-text-field v-model="newExercise.sets" label="Подходы" type="number" />
          <v-text-field v-model="newExercise.reps" label="Повторения" type="number" />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="createExercise">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises'
import ExerciseCard from '~/components/exercises/ExerciseCard.vue'

const exerciseStore = useExerciseStore()
const search = ref('')
const filterDifficulty = ref(null)
const dialog = ref(false)
const newExercise = ref({ name: '', instructions: '', difficulty: 'medium', sets: 3, reps: 10 })
const difficultyOptions = ['easy', 'medium', 'hard']

const filteredExercises = computed(() => {
  let list = exerciseStore.exercises
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(e => e.name.toLowerCase().includes(q))
  }
  if (filterDifficulty.value) {
    list = list.filter(e => e.difficulty === filterDifficulty.value)
  }
  return list
})

const createExercise = () => {
  if (newExercise.value.name) {
    exerciseStore.addExercise({ ...newExercise.value, id: Date.now() })
    dialog.value = false
    newExercise.value = { name: '', instructions: '', difficulty: 'medium', sets: 3, reps: 10 }
  }
}

onMounted(() => exerciseStore.loadExercises())
</script>