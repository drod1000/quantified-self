$('document').ready(function() {
  calculateTotalMealCalories('#breakfast-list');
  calculateTotalMealCalories('#lunch-list');
  calculateTotalMealCalories('#dinner-list');
  calculateTotalMealCalories('#snacks-list');

  calculateGrandTotalCalories();

})

function calculateTotalMealCalories(table) {
  var Rows = $(table).find('.food-row');
  var total = 0;

  $.each(Rows, function() {
    var rowCalories = parseInt($(this).find('.food-calories').text());
    total = total + rowCalories;
  });
  var totalcaloriesCell = $(table).find('.total-calories');
  totalcaloriesCell.text(total);
}

function calculateGrandTotalCalories() {
  var calorieTotals = $('.total-calories')
  var grandtotalCalories = 0;

  $.each(calorieTotals, function() {
    var totalTableCalories = parseInt($(this).text());
    grandtotalCalories = grandtotalCalories + totalTableCalories;
  });

  var grandtotalCaloriesCell = $('#totals-table').find('.grand-total-calories');
  grandtotalCaloriesCell.text(grandtotalCalories);
}
