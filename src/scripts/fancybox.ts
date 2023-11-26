import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

export function fancyboxInit() {
  Fancybox.defaults = {
    ...Fancybox.defaults,
    dragToClose: false,
  }

  const buttons = document.querySelectorAll('[data-fancy-button]')
  buttons.forEach((button) => {
    const id = button.getAttribute('data-fancy-button')
    button?.addEventListener('click', () => {
      // console.log('CLIIICK', id)
      Fancybox.close()

      // @ts-ignore
      Fancybox.show([{ src: `#fancy-modal-${id}`, type: 'inline' }])
    })
  })
}
