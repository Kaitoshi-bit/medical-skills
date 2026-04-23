import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patients', () => {
  const patients = ref([])

  const loadPatients = () => {
    const stored = localStorage.getItem('patients')
    if (stored) {
      patients.value = JSON.parse(stored)
    } else {
      // mock данные
      patients.value = [
        {
          id: 1,
          firstName: 'Иван',
          lastName: 'Петров',
          birthDate: '1985-06-15',
          phone: '+7 999 123-45-67',
          email: 'ivan@example.com',
          diagnosis: 'Растяжение колена',
          injuries: [
            { id: 1, type: 'collateral_ligament', date: '2025-03-10', status: 'treatment' }
          ],
          treatmentPlan: {
            startDate: '2025-03-10',
            endDate: '2025-05-10',
            exercises: [1, 3],
            medications: ['Ибупрофен 400 мг 2р/д']
          },
          notes: [
            { id: 1, date: '2025-03-15', text: 'Пациент жалуется на боль при сгибании' }
          ],
          exerciseProgress: { 1: 5, 3: 2 } // сколько подходов выполнено
        },
        {
          id: 2,
          firstName: 'Мария',
          lastName: 'Сидорова',
          birthDate: '1990-11-02',
          phone: '+7 999 987-65-43',
          email: 'maria@example.com',
          diagnosis: 'Тендинит плеча',
          injuries: [
            { id: 2, type: 'tendonitis', date: '2025-02-20', status: 'rehabilitation' }
          ],
          treatmentPlan: {
            startDate: '2025-02-20',
            endDate: '2025-04-20',
            exercises: [2, 4],
            medications: []
          },
          notes: [],
          exerciseProgress: { 2: 8, 4: 3 }
        }
      ]
      savePatients()
    }
  }

  const savePatients = () => {
    localStorage.setItem('patients', JSON.stringify(patients.value))
  }

  const addPatient = (patient) => {
    patient.id = Date.now()
    patients.value.push(patient)
    savePatients()
  }

  const updatePatient = (id, data) => {
    const index = patients.value.findIndex(p => p.id === id)
    if (index !== -1) {
      patients.value[index] = { ...patients.value[index], ...data }
      savePatients()
    }
  }

  const addNote = (patientId, note) => {
    const patient = patients.value.find(p => p.id === patientId)
    if (patient) {
      note.id = Date.now()
      note.date = new Date().toISOString().split('T')[0]
      patient.notes.push(note)
      savePatients()
    }
  }

  const updateExerciseProgress = (patientId, exerciseId, completedSets) => {
    const patient = patients.value.find(p => p.id === patientId)
    if (patient) {
      if (!patient.exerciseProgress) patient.exerciseProgress = {}
      patient.exerciseProgress[exerciseId] = (patient.exerciseProgress[exerciseId] || 0) + completedSets
      savePatients()
    }
  }

  const activeInjuriesCount = computed(() => {
    return patients.value.reduce((sum, p) => sum + p.injuries.filter(i => i.status !== 'closed').length, 0)
  })

  const totalCompletedExercises = computed(() => {
    let total = 0
    patients.value.forEach(p => {
      if (p.exerciseProgress) {
        total += Object.values(p.exerciseProgress).reduce((a,b) => a + b, 0)
      }
    })
    return total
  })

  return {
    patients,
    loadPatients,
    addPatient,
    updatePatient,
    addNote,
    updateExerciseProgress,
    activeInjuriesCount,
    totalCompletedExercises
  }
})