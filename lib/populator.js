class Populator {

  calculateTotalMealCalories(table) {
    var rows = $(table).find('.food-row');
    var total = 0;

    $.each(rows, function() {
      var rowCalories = parseInt($(this).find('.food-calories').text());
      total = total + rowCalories;
    });
    var totalCaloriesCell = $(table).find('.total-calories');

    totalCaloriesCell.text(total);
  }

  calculateMealRemaining(table) {
    var goal = parseInt(table.attr('id'));
    var totalCaloriesCell = table.children('tfoot').children('tr:nth-child(1)').children('td:nth-child(2)')
    var remainingCaloriesCell = table.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)')

    remainingCaloriesCell.text(goal - parseInt(totalCaloriesCell.text()));
  }

  calculateGrandTotalCalories() {
    var calorieTotals = $('.total-calories')
    var grandtotalCalories = 0;

    $.each(calorieTotals, function() {
      var totalTableCalories = parseInt($(this).text());
      grandtotalCalories = grandtotalCalories + totalTableCalories;
    });

    var grandtotalCaloriesCell = $('#totals-table').find('.grand-total-calories');
    grandtotalCaloriesCell.text(grandtotalCalories);
  }

  calculateTotalRemaining(consumed, goal) {
    var totalCalories = parseInt($('#totals-table tr:nth-child(2) td:nth-child(2)').text());
    var goal = parseInt($('#totals-table tr:nth-child(1) td:nth-child(2)').text());
    var caloriesRemaining = goal - totalCalories;
    var caloriesRemainingCell = $('#totals-table tr:nth-child(3) td:nth-child(2)');
    caloriesRemainingCell.text(caloriesRemaining);
  }

  reloadTables(table) {
    this.calculateTotalMealCalories(table);
    this.calculateGrandTotalCalories();
    this.calculateMealRemaining(table);
    this.calculateTotalRemaining();
    formatRemainingCells();
  }
}
