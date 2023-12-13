export function select() {
  const selects = $('[data-select]')

  if (selects.length) {
    // при клике в любом месте страницы
    // закрываются открытые селекты
    $(window).on('click', function () {
      $('[data-select-drop]').slideUp(100)
      $('[data-select]').removeClass('active')
    })

    // если был клик по селекту - он открывается
    $('[data-select-button]').on('click', function () {
      const select = $(this).closest('[data-select]')

      // таймаут, потому что клик по окну
      // всплывает дольше
      setTimeout(() => {
        select.toggleClass('active')
        select.find('[data-select-drop]').slideToggle(100)
      })
    })

    // выбор опции в селекте
    $('[data-select-option]').on('click', function () {
      const select = $(this).closest('[data-select]')

      select.find('[data-select-active]').text($(this).text())
      select.find('[data-select-drop]').slideUp(100)
      select.removeClass('active')
    })

    // сброс фильтров в каталоге
    const reset = document.querySelector('[data-filter-reset-desktop]')

    if (reset) {
      reset.addEventListener('click', () => {
        const titles = document.querySelectorAll('[data-select-active]')

        titles.forEach((title) => {
          title.innerText = title
            .closest('[data-select-title]')
            .getAttribute('data-select-title')
        })
      })
    }
  }
}
