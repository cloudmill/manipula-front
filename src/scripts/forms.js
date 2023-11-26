import 'parsleyjs'
import mask from 'inputmask'
import { Fancybox } from '@fancyapps/ui'

$(() => {
  // parsley
  $('form').parsley()
  $('form').on('submit', (e) => {
    e.preventDefault()
    e.target.closest('form').reset()

    if (
      e.target.closest('[data-write-form]') ||
      e.target.closest('[data-contacts-form]')
    ) {
      Fancybox.close()
      Fancybox.show([{ src: `#fancy-modal-success`, type: 'inline' }])
    }
    if (e.target.closest('[data-login-form]')) {
      Fancybox.close()
    }
  })

  Parsley.addMessages('ru', {
    defaultMessage: 'Некорректное значение',
    type: {
      email: 'Введите адрес электронной почты',
      url: 'Введите URL адрес',
      number: 'Введите число',
      integer: 'Введите целое число',
      digits: 'Введите только цифры',
      alphanum: 'Введите буквенно-цифровое значение',
    },
    notblank: 'Это поле должно быть заполнено',
    required: 'Обязательное поле',
    pattern: 'Это значение некорректно',
    min: 'Это значение должно быть не менее чем %s',
    max: 'Это значение должно быть не более чем %s',
    range: 'Это значение должно быть от %s до %s',
    minlength: 'Минимум %s символов',
    maxlength: 'Это значение должно содержать не более %s символов',
    length: 'Это значение должно содержать от %s до %s символов',
    mincheck: 'Выберите не менее %s значений',
    maxcheck: 'Выберите не более %s значений',
    check: 'Выберите от %s до %s значений',
    equalto: 'Пароли не совпадают',
  })

  Parsley.setLocale('ru')

  // маска на телефон
  Inputmask({ mask: '+7 (999) 999-99-99', showMaskOnHover: false }).mask(
    '[data-mask-phone]'
  )

  // маска на дату
  Inputmask({ mask: '99.99.9999 - 99.99.9999', showMaskOnHover: false }).mask(
    '[data-mask-date]'
  )

  const inputs = document.querySelectorAll('[data-input]')

  if (inputs.length) {
    inputs.forEach((input) => {
      input.oninput = function () {
        if (this.value) {
          this.classList.add('active')
        } else {
          this.classList.remove('active')
        }
      }
    })
  }
})
