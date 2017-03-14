$('document').ready(function() {
  calculateTotalCalories('#breakfast-list');
  calculateTotalCalories('#lunch-list');
  calculateTotalCalories('#dinner-list');
  calculateTotalCalories('#snacks-list');

})

function calculateTotalCalories(table) {
  var Rows = $(table).find('.food-row');
  var total = 0;

  $.each(Rows, function() {
    var rowCalories = parseInt($(this).find('.food-calories').text());
    total = total + rowCalories;
  });
  var totalcaloriesCell = $(table).find('.total-calories');
  totalcaloriesCell.text(total);
}
