export function catalogMenu() {
  $('[data-menu-button]').on('mouseenter', function () {
    const id = this.getAttribute('data-menu-button')

    if ($(this).hasClass('active')) {
      $(`[data-menu]`).css('display', 'none')
      $(this).removeClass('active')

      $(`[data-menu-sub]`).css('display', 'none')
      $('[data-menu-button-sub]').removeClass('active')
    } else {
      $(`[data-menu]`).css('display', 'none')
      $(`[data-menu="${id}"]`).toggle('slide')

      $('[data-menu-button]').removeClass('active')
      $(this).addClass('active')

      $(`[data-menu-sub]`).css('display', 'none')
      $('[data-menu-button-sub]').removeClass('active')
    }
  })
  $('[data-menu-button-sub]').on('mouseenter', function () {
    const id = this.getAttribute('data-menu-button-sub')

    if ($(this).hasClass('active')) {
      $(`[data-menu-sub]`).css('display', 'none')
      $(this).removeClass('active')
    } else {
      $(`[data-menu-sub]`).css('display', 'none')
      $(`[data-menu-sub="${id}"]`).toggle('slide')

      $('[data-menu-button-sub]').removeClass('active')
      $(this).addClass('active')
    }
  })
}
