apos.on('ready', function () {
  // hide "Edit undefined" when not logged in
  if (!apos.user) {
    $('<style>.apos-button-label { display: none; }</style>').appendTo('head')
  }

  $('[data-apos-pieces-submit-form]').on('submit', function () {
    $('[data-apos-pieces-submit-thank-you]').show()
  })
})
