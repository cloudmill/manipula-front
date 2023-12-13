export function dropdown() {
  const mediaQuery = window.matchMedia(`(max-width: 1023px)`)

  $('[data-dropdown-button]').on('click', function () {
    if (
      Boolean($(this).closest('[data-dropdown-mob]').length) &&
      mediaQuery.matches
    ) {
      $(this).closest('[data-dropdown]').toggleClass('active')
      $(this)
        .closest('[data-dropdown]')
        .find('[data-dropdown-drop]')
        .slideToggle(100)
    } else if (!$(this).closest('[data-dropdown-mob]').length) {
      $(this).closest('[data-dropdown]').toggleClass('active')
      $(this)
        .closest('[data-dropdown]')
        .find('[data-dropdown-drop]')
        .slideToggle(100)
    }
  })
}
