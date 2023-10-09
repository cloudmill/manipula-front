export function dropdown() {
  $('[data-dropdown-button]').on('click', function () {
    $(this).closest('[data-dropdown]').toggleClass('active')
    $(this)
      .closest('[data-dropdown]')
      .find('[data-dropdown-drop]')
      .slideToggle()
  })
}
