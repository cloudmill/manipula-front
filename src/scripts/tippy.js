import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

export function tooltip() {
  const template1 = document.getElementById('solutions-search')
  const template2 = document.getElementById('search-grop')
  const prodTootip = document.querySelector('[data-tippy-content]')

  const solutionsInput = document.querySelector('[data-solutions-input]')

  if (template1 && solutionsInput) {
    const solutionsDrop = tippy('[data-solutions-search]', {
      content: template1.innerHTML,
      placement: 'bottom-start',
      offset: [0, 4],
      arrow: false,
      allowHTML: true,
      interactive: true,
      // triggerTarget: solutionsInput,
      trigger: 'click',
    })

    // solutionsInput.addEventListener('input', (e) => {
    //   if (e.target.value.length > 0) {
    //     solutionsDrop.show()
    //   } else {
    //     solutionsDrop.hide()
    //   }
    // })
  }

  if (template2) {
    tippy('[data-search-form-cont]', {
      content: template2.innerHTML,
      placement: 'bottom-start',
      offset: [0, 7],
      arrow: false,
      allowHTML: true,
      interactive: true,
      trigger: 'click',
    })
  }

  if (prodTootip) {
    tippy('[data-tippy-content]', {
      theme: 'light',
      trigger: 'click',
      interactive: true,
    })
  }
}
