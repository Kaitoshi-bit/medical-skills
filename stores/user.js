import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
const user = ref({
  name: 'Доктор',
  xp: 0,
  solvedTasks: [],
  level: 1,
  email: 'doctor@clinic.ru'
})

  const loadUser = () => {
    const stored = localStorage.getItem('medical_user')
    if (stored) {
      user.value = JSON.parse(stored)
    } else {
      user.value = { name: 'Доктор', xp: 0, solvedTasks: [] }
      saveUser()
    }
  }

  const saveUser = () => {
    localStorage.setItem('medical_user', JSON.stringify(user.value))
  }

  const addSolvedTask = (taskId, points) => {
    if (!user.value.solvedTasks.includes(taskId)) {
      user.value.solvedTasks.push(taskId)
      user.value.xp += points
      saveUser()
    }
  }

  return { user, loadUser, addSolvedTask, solvedTasks: computed(() => user.value.solvedTasks), xp: computed(() => user.value.xp) }
})