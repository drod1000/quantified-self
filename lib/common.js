$('document').ready(function() {
  $(document).on('click', '.food-delete', function() {
    var row = $(this).parent();

    row.remove();
  });
})
