import { defineStore } from 'pinia'

export const useReminderStore = defineStore('reminders', () => {
  const reminders = ref([])

  const loadReminders = () => {
    const stored = localStorage.getItem('reminders')
    if (stored) {
      reminders.value = JSON.parse(stored)
    } else {
      // mock данные
      reminders.value = [
        {
          id: 1,
          patientId: 1,
          title: 'Приём ибупрофена',
          datetime: '2025-04-23T19:00',
          completed: false,
          type: 'medication'
        },
        {
          id: 2,
          patientId: 1,
          title: 'Сделать упражнение "Приседания у стены"',
          datetime: '2025-04-24T10:00',
          completed: false,
          type: 'exercise'
        },
        {
          id: 3,
          patientId: 2,
          title: 'Осмотр у врача',
          datetime: '2025-04-25T14:30',
          completed: false,
          type: 'appointment'
        }
      ]
      saveReminders()
    }
  }

  const saveReminders = () => {
    localStorage.setItem('reminders', JSON.stringify(reminders.value))
  }

  const addReminder = (reminder) => {
    reminder.id = Date.now()
    reminders.value.push(reminder)
    saveReminders()
  }

  const toggleCompleted = (id) => {
    const rem = reminders.value.find(r => r.id === id)
    if (rem) {
      rem.completed = !rem.completed
      saveReminders()
    }
  }

  const deleteReminder = (id) => {
    reminders.value = reminders.value.filter(r => r.id !== id)
    saveReminders()
  }

  return {
    reminders,
    loadReminders,
    addReminder,
    toggleCompleted,
    deleteReminder
  }
})