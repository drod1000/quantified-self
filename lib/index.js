$('document').ready(function() {
  calculateTotalMealCalories('.breakfast-list');
  calculateTotalMealCalories('.lunch-list');
  calculateTotalMealCalories('.dinner-list');
  calculateTotalMealCalories('.snacks-list');
  calculateGrandTotalCalories();

  calculateMealRemaining('.breakfast-list');
  calculateMealRemaining('.lunch-list');
  calculateMealRemaining('.dinner-list');
  calculateMealRemaining('.snacks-list');
  calculateTotalRemaining();
  formatRemainingCells();

  $('#create-new-food').click(function() {
    window.location.href = '../quantified-self/foods.html'; //relative to domain
  });

  addFoodToMeal('breakfast');
  addFoodToMeal('lunch');
  addFoodToMeal('dinner');
  addFoodToMeal('snacks');

  $(document).on('click', '.food-delete', function() {
    var row = $(this).parent();
    var tableID = "#" + $(this).parents('table').attr('id');
    row.remove();

    reloadTables(tableID);
  });
});

function addFoodToMeal(meal) {
  $('#' + meal).click(function() {
    var foods = getFoods();
    foods.forEach(function(food) {
      appendRowToMeal(food["name"], food["calories"], '.' + meal + '-list');
    });
    clearCheckBoxes();
  });
}

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

function calculateMealRemaining(table) {
  var goal = parseInt($(table).attr('id'));
  var totalCaloriesCell = $(table + ' tfoot tr:nth-child(1) td:nth-child(2)');
  var remainingCaloriesCell = $(table + ' tfoot tr:nth-child(2) td:nth-child(2)');

  remainingCaloriesCell.text(goal - parseInt(totalCaloriesCell.text()));
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

function getFoods() {
  var selectedFoods = [];
  $(":checked").each(function() {
    var name = $(this).parent('td').parent('tr').children('td.food-name').text();
    var calories = $(this).parent('td').parent('tr').children('td.food-calories').text();
    selectedFoods.push({name: name, calories: calories});
  });
  return selectedFoods;
};

function appendRowToMeal(name, calories, meal) {
  var markup = generateDiaryMealRow(name, calories);
  $(meal).append(markup);
};

function generateDiaryMealRow(name, calories) {
  return "<tr class='food-row'>" +
            "<td class='food-name'>" + name + "</td>" +
            "<td class='food-calories right-align'>" + calories + "</td>" +
          "</tr>"
};

function clearCheckBoxes() {
  $(":checked").prop('checked',false);

};

function reloadTables(table) {
  calculateTotalMealCalories(table);
  calculateGrandTotalCalories();
  calculateMealRemaining(table);
  calculateTotalRemaining();
  formatRemainingCells();
}
