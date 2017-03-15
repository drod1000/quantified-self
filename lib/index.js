$('document').ready(function() {
  calculateTotalMealCalories('#breakfast-list');
  calculateTotalMealCalories('#lunch-list');
  calculateTotalMealCalories('#dinner-list');
  calculateTotalMealCalories('#snacks-list');
  calculateGrandTotalCalories();

  calculateMealRemaining('#breakfast-list', 400);
  calculateMealRemaining('#lunch-list', 600);
  calculateMealRemaining('#dinner-list', 800);
  calculateMealRemaining('#snacks-list', 200);
  calculateTotalRemaining();
  formatRemainingCells();

  $('#create-new-food').click(function() {
    window.location.href = '../quantified-self/foods.html'; //relative to domain
  });
});

function calculateTotalMealCalories(table) {
  var rows = $(table).find('.food-row');
  var total = 0;

  $.each(rows, function() {
    var rowCalories = parseInt($(this).find('.food-calories').text());
    total = total + rowCalories;
  });
  var totalCaloriesCell = $(table).find('.total-calories');

  totalCaloriesCell.text(total);
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

function formatRemainingCells() {
  var remainingCells = $('.remaining-calories');

  $.each(remainingCells, function() {
    cell = $(this);
    formatRemainingCell(cell);
  })
}

function formatRemainingCell(cell) {
  var remainingCalories = parseInt(cell.text());

  if(remainingCalories >= 0) {
    cell.css("color", "green");
  }
  else {
    cell.css("color", "red");
  }
}
