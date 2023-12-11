import './styles/app.scss'
// import AOS from 'aos'

import './scripts/forms'

import { swiperInit } from './scripts/sliders.ts'
import { fancyboxInit } from './scripts/fancybox.ts'
import { dropdown } from './scripts/dropdown.js'
import { tabs } from './scripts/tabs.js'
import { tooltip } from './scripts/tippy.js'
import { select } from './scripts/select.js'

window.addEventListener('DOMContentLoaded', () => {
  tooltip()
  swiperInit()
  fancyboxInit()
  dropdown()
  tabs()
  // select()

  const searchReset = document.querySelectorAll('[data-search-reset]')

  if (searchReset.length) {
    searchReset.forEach((it) => {
      it.addEventListener('click', (e) => {
        const form = e.target.closest('[data-search-form]')
        form.querySelector('[data-search]').value = ''
      })
    })
  }
})
