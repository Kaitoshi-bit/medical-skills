export const useObserver = () => {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    // Выбираем все элементы с классом .fade-up, исключая те, что внутри .filters-no-animation
    const targets = document.querySelectorAll('.fade-up')
    targets.forEach(el => {
      if (!el.closest('.filters-no-animation')) {
        observer.observe(el)
      }
    })
  })
}