export function tabs() {
  const panels = document.querySelectorAll('[data-tabs-panel]')

  panels.forEach((el) => {
    el.addEventListener('click', (e) => {
      const activeTab = e.target.closest('[data-tab]')
      const activePanel = e.target.closest('[data-tabs-panel]')

      const oldActiveTab = activePanel.querySelector('[data-tab].active')

      if (activeTab) {
        if (oldActiveTab) {
          oldActiveTab.classList.remove('active')
        }

        activeTab.classList.add('active')
      }
    })
  })
}
