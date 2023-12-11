import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

export function fancyboxInit() {
  const defaults = {
    ...Fancybox.defaults,
    dragToClose: false,
  }

  const buttons = document.querySelectorAll('[data-fancy-button]')
  buttons.forEach((button) => {
    const id = button.getAttribute('data-fancy-button')

    button?.addEventListener('click', () => {
      Fancybox.defaults = {
        ...defaults,
        on: {
          shouldClose: () => {
            button.classList.remove('active')
          },
        },
      }

      if (button.classList.contains('active')) {
        Fancybox.close()
      } else {
        if (id === 'catalog' || id === 'mobile-menu') {
          Fancybox.defaults = {
            ...Fancybox.defaults,
            tpl: {
              closeButton:
                '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
              main: `<div class="fancybox__container down" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1"><div class="fancybox__backdrop"></div><div class="fancybox__carousel"></div><div class="fancybox__footer"></div></div>`,
            },
          }
        }
        button.classList.add('active')
        if (id === 'filter1' || id === 'filter2') {
          Fancybox.close()
        }
        // @ts-ignore
        Fancybox.show([{ src: `#fancy-modal-${id}`, type: 'inline' }])
      }
    })
  })
}
