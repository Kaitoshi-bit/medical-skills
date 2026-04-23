export const useLocalStorage = (key, defaultValue) => {
  const data = ref(defaultValue)

  const load = () => {
    const stored = localStorage.getItem(key)
    if (stored) {
      data.value = JSON.parse(stored)
    } else {
      data.value = defaultValue
    }
  }

  const save = () => {
    localStorage.setItem(key, JSON.stringify(data.value))
  }

  watch(data, save, { deep: true })
  onMounted(load)

  return { data, load, save }
}