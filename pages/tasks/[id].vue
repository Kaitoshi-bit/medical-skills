<template>
  <div v-if="task">
    <v-btn to="/" variant="text" prepend-icon="mdi-arrow-left" class="mb-4">Назад к задачам</v-btn>

    <v-row>
      <v-col cols="12" md="7">
        <v-card>
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle>{{ task.specialty }} • {{ task.points }} очков</v-card-subtitle>
          <v-divider />
          <v-card-text class="pt-4">
            <div class="text-body-1 mb-4" v-html="task.description.replace(/\n/g, '<br>')"></div>
            <v-divider class="my-4" />
            <div class="text-h6 mb-2">{{ task.question }}</div>

            <div v-if="task.type === 'single_choice'">
              <v-radio-group v-model="userAnswer">
                <v-radio v-for="opt in task.options" :key="opt" :label="opt" :value="opt" />
              </v-radio-group>
            </div>

            <v-btn color="primary" @click="checkAnswer" :loading="loading">Проверить ответ</v-btn>

            <v-alert v-if="result" :type="result.correct ? 'success' : 'error'" class="mt-4">
              <div v-if="result.correct">✅ Правильно! +{{ task.points }} очков.</div>
              <div v-else>❌ Неправильно. {{ result.message }}</div>
              <div v-if="!result.correct && task.explanation" class="mt-2">
                <strong>Пояснение:</strong> {{ task.explanation }}
              </div>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card variant="tonal">
          <v-card-title>📊 Ваш прогресс</v-card-title>
          <v-card-text>
            <p>Решено задач: {{ solvedCount }}</p>
            <p>Очков: {{ userXp }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else>Загрузка...</div>
</template>

<script setup>
import { useTaskStore } from '~/stores/tasks'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const taskStore = useTaskStore()
const userStore = useUserStore()

const task = computed(() => taskStore.getTaskById(parseInt(route.params.id)))

const userAnswer = ref(null)
const loading = ref(false)
const result = ref(null)

const solvedCount = computed(() => userStore.solvedTasks.length)
const userXp = computed(() => userStore.xp)

const checkAnswer = () => {
  if (!userAnswer.value) return
  loading.value = true
  setTimeout(() => {
    const isCorrect = (userAnswer.value === task.value.correctAnswer)
    if (isCorrect) {
      userStore.addSolvedTask(task.value.id, task.value.points)
      result.value = { correct: true, message: 'Отличная работа!' }
    } else {
      result.value = { correct: false, message: 'Попробуй ещё раз.' }
    }
    loading.value = false
  }, 500)
}

onMounted(() => {
  taskStore.loadTasks()
  userStore.loadUser()
})
</script>