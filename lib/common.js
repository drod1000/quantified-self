$('document').ready(function() {
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
