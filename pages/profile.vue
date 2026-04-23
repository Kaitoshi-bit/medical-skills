<template>
  <div class="profile-static">
    <h1 class="text-h4 mb-4">👤 Профиль врача</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="glass pa-4 text-center">
          <v-avatar size="100" color="primary" class="mb-3">
            <v-icon icon="mdi-account" size="64" color="white" />
          </v-avatar>
          <h2 class="text-h5">{{ user.name }}</h2>
          <p class="text-grey">{{ user.email || 'doctor@clinic.ru' }}</p>
          <v-divider class="my-3" />
          <div class="text-h6">Уровень: {{ user.level }}</div>
          <v-progress-linear :model-value="xpProgress" height="10" rounded class="my-2" />
          <div class="text-caption">{{ user.xp }} / {{ nextLevelXp }} XP</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="glass pa-4">
          <v-card-title>📊 Статистика</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-title>Решено задач</v-list-item-title>
              <template v-slot:append>{{ solvedCount }}</template>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Всего очков</v-list-item-title>
              <template v-slot:append>{{ user.xp }}</template>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Достижения</v-list-item-title>
              <template v-slot:append>
                <v-chip v-for="ach in achievements" :key="ach" size="small" class="ml-1">🏅 {{ ach }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
userStore.loadUser()

const user = computed(() => userStore.user)
const solvedCount = computed(() => userStore.solvedTasks.length)

const xpProgress = computed(() => {
  const level = user.value.level || 1
  const xpForCurrentLevel = (level - 1) * 500
  const currentXP = user.value.xp - xpForCurrentLevel
  return (currentXP / 500) * 100
})

const nextLevelXp = computed(() => {
  const level = user.value.level || 1
  return level * 500
})

const achievements = computed(() => {
  const ach = []
  if (solvedCount.value >= 1) ach.push('Первый шаг')
  if (solvedCount.value >= 5) ach.push('Знаток')
  if (solvedCount.value >= 10) ach.push('Мастер диагностики')
  return ach
})
</script>

<style scoped>
.glass {
  background: rgba(232, 224, 213, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid #1A1A1A;
  border-radius: 0;
}
/* Жёстко отключаем любые анимации и переходы */
.profile-static,
.profile-static * {
  animation: none !important;
  transition: none !important;
  transform: none !important;
  opacity: 1 !important;
}
</style>