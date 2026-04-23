import { defineStore } from 'pinia'

export const useExerciseStore = defineStore('exercises', () => {
  const exercises = ref([])

  const loadExercises = () => {
    const stored = localStorage.getItem('exercises')
    if (stored) {
      exercises.value = JSON.parse(stored)
    } else {
      // mock данные
      exercises.value = [
        {
          id: 1,
          name: 'Приседания у стены',
          category: 'quadriceps',
          videoUrl: '',
          instructions: 'Спина прямая, пятки прижаты к полу, держать 30 секунд.',
          sets: 3,
          reps: 10,
          duration: 15,
          difficulty: 'medium'
        },
        {
          id: 2,
          name: 'Вращение плечами',
          category: 'shoulder',
          videoUrl: '',
          instructions: 'Круговые движения плечами вперёд/назад по 10 раз.',
          sets: 2,
          reps: 15,
          duration: 5,
          difficulty: 'easy'
        },
        {
          id: 3,
          name: 'Подъём ноги лёжа',
          category: 'quadriceps',
          videoUrl: '',
          instructions: 'Лёжа на спине, поднимать прямую ногу на 45°, задержка 5 сек.',
          sets: 3,
          reps: 12,
          duration: 10,
          difficulty: 'medium'
        },
        {
          id: 4,
          name: 'Растяжка бицепса',
          category: 'biceps',
          videoUrl: '',
          instructions: 'Рука вытянута в сторону, ладонь вверх, тянем пальцы назад.',
          sets: 2,
          reps: 8,
          duration: 8,
          difficulty: 'easy'
        }
      ]
      saveExercises()
    }
  }

  const saveExercises = () => {
    localStorage.setItem('exercises', JSON.stringify(exercises.value))
  }

  const addExercise = (exercise) => {
    exercise.id = Date.now()
    exercises.value.push(exercise)
    saveExercises()
  }

  const getExerciseById = (id) => exercises.value.find(e => e.id === id)

  return {
    exercises,
    loadExercises,
    addExercise,
    getExerciseById
  }
})