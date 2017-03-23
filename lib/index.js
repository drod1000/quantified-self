$('document').ready(function() {
  displayDiaryFoods(foods);
  displayMealFoods(mealFoods);


  calculateTotalMealCalories($('.breakfast-list'));
  calculateTotalMealCalories($('.lunch-list'));
  calculateTotalMealCalories($('.dinner-list'));
  calculateTotalMealCalories($('.snacks-list'));

  calculateGrandTotalCalories();

  calculateMealRemaining($('.breakfast-list'));
  calculateMealRemaining($('.lunch-list'));
  calculateMealRemaining($('.dinner-list'));
  calculateMealRemaining($('.snacks-list'));
  calculateTotalRemaining();

  formatRemainingCells();

  $('#create-new-food').click(function() {
    window.location.href = '../quantified-self/foods.html'; //relative to domain
  });

  $('.add-food').on('click', function() {
    addFoodToMeal($(this).attr('id'))
  })

  $(document).on('click', '.food-delete', function() {
    var row = $(this).parent();
    var foodNameToDelete = row.children('td.food-name').text();
    var table = $(this).parents('table');
    var mealNameToDelete = "." + table.attr('class');

    row.remove();
    deleteMealFoodFromLocalStorage(foodNameToDelete, mealNameToDelete);
    reloadTables(table);
  });
});

function displayDiaryFoods(foods) {
  getFoods()
  .done(function(foods) {
    foods.forEach(function(food) {
      appendRowToDiaryFoods(food["id"], food["name"], food["calories"]);
    })
  })
};

function displayMealFoods(mealFoods) {
  if(mealFoods) {
    mealFoods.forEach(function(food) {
      appendRowToMeal(food["name"], food["calories"], food["meal"]);
    })
  };
}

function appendRowToDiaryFoods(id, name, calories) {
  var markup = generateDiaryFoodRow(id, name, calories);
  $('#add-food-list').prepend(markup);
};

function generateDiaryFoodRow(id, name, calories) {
  return "<tr class='food-row'>" +
            "<td><input type='checkbox' /></td>" +
            "<td class='food-id food-field'>" + id + "</td>" +
            "<td class='food-name food-field'>" + name + "</td>" +
            "<td class='food-calories food-field right-align'>" + calories + "</td>" +
          "</tr>"
};

function addFoodToMeal(meal) {
    var foods = getFoods();
    foods.forEach(function(food) {
      var newMealFood = {name: food["name"], calories: food["calories"], meal: '.' + meal + '-list' };
      mealFoods.push(newMealFood);
      localStorage.setItem('mealFoodsList', JSON.stringify(mealFoods));
      appendRowToMeal(food["name"], food["calories"], '.' + meal + '-list');
    });
    clearCheckBoxes();

    var table = $('.' + meal + '-list')
    reloadTables(table);
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
  var goal = parseInt(table.attr('id'));
  var totalCaloriesCell = table.children('tfoot').children('tr:nth-child(1)').children('td:nth-child(2)')
  var remainingCaloriesCell = table.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)')

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
            "<td class='food-calories right-align'>" + calories + "</td>" + "<td class='food-delete'><button>-</button></td>"
          "</tr>"
};

function clearCheckBoxes() {
  $(":checked").prop('checked',false);

};

function deleteMealFoodFromLocalStorage(foodNameToDelete, mealNameToDelete) {
  for (i = 0; i < mealFoods.length; ++i) {
    if (mealFoods[i]["name"] == foodNameToDelete && mealFoods[i]["meal"] == mealNameToDelete) {
      mealFoods.remove(i);
      break;
    }
  }
  localStorage.setItem('mealFoodsList', JSON.stringify(mealFoods));
}

function reloadTables(table) {
  calculateTotalMealCalories(table);
  calculateGrandTotalCalories();
  calculateMealRemaining(table);
  calculateTotalRemaining();
  formatRemainingCells();
}
