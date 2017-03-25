class Calculate {
  static totalMealCalories(table) {
    var rows = $(table).find('.food-row');
    var total = 0;

    $.each(rows, function() {
      var rowCalories = parseInt($(this).find('.food-calories').text());
      total = total + rowCalories;
    });
    var totalCaloriesCell = $(table).find('.total-calories');

    totalCaloriesCell.text(total);
  }
}
