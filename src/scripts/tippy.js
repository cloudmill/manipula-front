import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { catalogMenu } from './catalog-menu'

export function tooltip() {
  const template1 = document.getElementById('solutions-search')
  const template2 = document.getElementById('catalog-menu')

  if (template1) {
    tippy('[data-solutions-search]', {
      content: template1.innerHTML,
      // maxWidth: 400,
      placement: 'bottom-start',
      offset: [0, 4],
      arrow: false,
      allowHTML: true,
      interactive: true,
      trigger: 'click',
    })
  }

  if (template2) {
    tippy('[data-catalog-button]', {
      content: template2.innerHTML,
      placement: 'bottom',
      arrow: false,
      allowHTML: true,
      interactive: true,
      trigger: 'click',

      onShow() {
        setTimeout(() => {
          catalogMenu()
        }, 100)
      },
    })
  }
}
