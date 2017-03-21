$('document').ready(function() {
  displayDiaryFoods(foods);
  displayMealFoods(mealFoods);

  var populator = new Populator;
  populator.calculateTotalMealCalories($('.breakfast-list'));
  populator.calculateTotalMealCalories($('.lunch-list'));
  populator.calculateTotalMealCalories($('.dinner-list'));
  populator.calculateTotalMealCalories($('.snacks-list'));

  populator.calculateGrandTotalCalories();

  populator.calculateMealRemaining($('.breakfast-list'));
  populator.calculateMealRemaining($('.lunch-list'));
  populator.calculateMealRemaining($('.dinner-list'));
  populator.calculateMealRemaining($('.snacks-list'));
  populator.calculateTotalRemaining();

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
    var populator = new Populator;
    populator.reloadTables(table);
  });
});

function displayDiaryFoods(foods) {
  if(foods){
    foods.forEach(function(food) {
      appendRowToDiaryFoods(food["name"], food["calories"]);
    });
  }
};

function displayMealFoods(mealFoods) {
  if(mealFoods) {
    mealFoods.forEach(function(food) {
      appendRowToMeal(food["name"], food["calories"], food["meal"]);
    })
  };
}

function appendRowToDiaryFoods(name, calories) {
  var markup = generateDiaryFoodRow(name, calories);
  $('#add-food-list').prepend(markup);
};

function generateDiaryFoodRow(name, calories) {
  return "<tr class='food-row'>" +
            "<td><input type='checkbox' /></td>" +
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
    var populator = new Populator;
    populator.reloadTables(table);
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
