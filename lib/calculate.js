class Calculate {
  static mealTotalCalories(table) {
    var rows = $(table).find('.food-row');
    var total = 0;

    $.each(rows, function() {
      var rowCalories = parseInt($(this).find('.food-calories').text());
      total = total + rowCalories;
    });
    var totalCaloriesCell = $(table).find('.total-calories');

    totalCaloriesCell.text(total);
  }

  static mealRemainingCalories(table) {
    var goal = parseInt(table.attr('id'));
    var totalCaloriesCell = table.children('tfoot').children('tr:nth-child(1)').children('td:nth-child(2)')
    var remainingCaloriesCell = table.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)')

    remainingCaloriesCell.text(goal - parseInt(totalCaloriesCell.text()));
  }

}
