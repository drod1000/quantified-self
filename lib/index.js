$('document').ready(function() {
  calculateTotalMealCalories('#breakfast-list');
  calculateTotalMealCalories('#lunch-list');
  calculateTotalMealCalories('#dinner-list');
  calculateTotalMealCalories('#snacks-list');

  calculateGrandTotalCalories();
  calculateTotalRemaining();

  calculateMealRemaining('#breakfast-list', 400);
  calculateMealRemaining('#lunch-list', 600);
  calculateMealRemaining('#dinner-list', 800);
  calculateMealRemaining('#snacks-list', 200);

  formatMealRemaining('#breakfast-list');
  formatMealRemaining('#lunch-list');
  formatMealRemaining('#dinner-list');
  formatMealRemaining('#snacks-list');
})

function calculateTotalMealCalories(table) {
  var rows = $(table).find('.food-row');
  var total = 0;

  $.each(rows, function() {
    var rowCalories = parseInt($(this).find('.food-calories').text());
    total = total + rowCalories;
  });
  var totalcaloriesCell = $(table).find('.total-calories');

  totalcaloriesCell.text(total);
}

function calculateMealRemaining(table, goal) {
  var totalCaloriesCell = $(table + ' tfoot tr:nth-child(1) td:nth-child(2)');
  var remainingCaloriesCell = $(table + ' tfoot tr:nth-child(2) td:nth-child(2)');

  remainingCaloriesCell.text(parseInt(totalCaloriesCell.text()) - goal);
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

function calculateTotalRemaining(consumed, goal) {
  var totalCalories = parseInt($('#totals-table tr:nth-child(2) td:nth-child(2)').text());
  var goal = parseInt($('#totals-table tr:nth-child(1) td:nth-child(2)').text());
  var caloriesRemaining = goal - totalCalories;
  var caloriesRemainingCell = $('#totals-table tr:nth-child(3) td:nth-child(2)');
  caloriesRemainingCell.text(caloriesRemaining);
}

function formatMealRemaining(table) {
  var remainingCaloriesCell = $(table + ' tfoot tr:nth-child(2) td:nth-child(2)');
  var remainingCalories = parseInt(remainingCaloriesCell.text());

    if(remainingCalories >= 0) {
      remainingCaloriesCell.css("color", "green");
    }
    else {
      remainingCaloriesCell.css("color", "red");
    }
}
