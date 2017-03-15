$('document').ready(function() {
  $(document).on('click', '.food-delete', function() {
    var row = $(this).parent();

    row.remove();
  });
  
  $(document.body).on('keyup', '.food-filter', function() {
    var input = $('input[name=food-name-filter]').val().toLowerCase();
    $('.food-row').show();

    $('.food-row').each(function() {
      var foodName = $(this).children('td.food-name').text().toLowerCase();
      if ( foodName.includes(input) ) {
      } else {
        $(this).hide();
      }
    });
  });
});
