export function select() {
  const selects = document.querySelectorAll('[data-select]')

  selects.forEach((select) => {
    select.addEventListener('click', (e) => {
      window.addEventListener('click', (e) => {
        select.classList.remove('active')
        select.querySelector('[data-dropdown-drop]').slideUp()
      })
    })
  })
}
