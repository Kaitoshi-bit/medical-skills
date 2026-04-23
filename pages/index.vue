<template>
  <div>
    <div class="text-center mb-8">
      <div class="text-h3 font-weight-bold mb-2">
        📚 Тренируй <span class="text-primary">клиническое мышление</span>
      </div>
      <p class="text-subtitle-1 text-grey-darken-1">Решай реальные медицинские кейсы, повышай уровень</p>
      <div class="divider-custom mx-auto"></div>
    </div>

    <!-- Фильтры + кнопка сброса -->
    <div class="filters-no-animation">
      <v-card class="mb-6" style="background: rgba(232, 224, 213, 0.9); border: 1px solid #1A1A1A; border-radius: 0;">
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" md="3">
              <v-select
                v-model="filters.specialty"
                label="Специальность"
                :items="specialties"
                clearable
                variant="outlined"
                prepend-inner-icon="mdi-stethoscope"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="filters.difficulty"
                label="Сложность"
                :items="difficulties"
                clearable
                variant="outlined"
                prepend-inner-icon="mdi-chart-bell-curve"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="filters.search"
                label="Поиск по названию"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                clearable
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn @click="resetTasks" color="primary" block variant="flat">Сбросить задачи</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <!-- Карточки задач + пагинация -->
    <v-row>
      <v-col
        v-for="(task, index) in paginatedTasks"
        :key="task.id"
        cols="12"
        md="6"
        lg="4"
        class="fade-up"
        :style="{ animationDelay: index * 0.05 + 's' }"
      >
        <TaskCard :task="task" />
      </v-col>
    </v-row>

    <!-- Пагинация -->
    <div class="d-flex justify-center mt-6">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        color="primary"
        circle
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useTaskStore } from '~/stores/tasks'
import TaskCard from '~/components/task/TaskCard.vue'
import { useObserver } from '~/composables/useObserver'
import { useNuxtApp } from '#app'

const taskStore = useTaskStore()
const { $router } = useNuxtApp()

// Принудительно загружаем задачи при монтировании и при активации страницы (для навигации)
onMounted(() => {
  taskStore.loadTasks()
})

// Фильтры
const filters = ref({ specialty: null, difficulty: null, search: '' })
const specialties = computed(() => [...new Set(taskStore.tasks.map(t => t.specialty))])
const difficulties = ['easy', 'medium', 'hard']

// Отфильтрованные задачи
const filteredTasks = computed(() => {
  let result = taskStore.tasks
  if (filters.value.specialty) result = result.filter(t => t.specialty === filters.value.specialty)
  if (filters.value.difficulty) result = result.filter(t => t.difficulty === filters.value.difficulty)
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase()
    result = result.filter(t => t.title.toLowerCase().includes(q))
  }
  return result
})

// Пагинация
const currentPage = ref(1)
const itemsPerPage = 6
const totalPages = computed(() => Math.ceil(filteredTasks.value.length / itemsPerPage))
const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTasks.value.slice(start, end)
})

// Сброс страницы при смене фильтров
watch([() => filters.value.specialty, () => filters.value.difficulty, () => filters.value.search], () => {
  currentPage.value = 1
})

// Принудительный сброс задач
const resetTasks = () => {
  localStorage.removeItem('medical_tasks')
  taskStore.loadTasks()
  filters.value = { specialty: null, difficulty: null, search: '' }
  currentPage.value = 1
}

useObserver()
</script>

<style scoped>
.divider-custom {
  width: 80px;
  height: 2px;
  background: #C41E3A;
  margin: 1rem auto;
}
.filters-no-animation,
.filters-no-animation * {
  animation: none !important;
  transition: none !important;
  transform: none !important;
}
</style>