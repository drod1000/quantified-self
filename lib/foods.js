$('document').ready(function() {
  displayFoods();

  $('#add-food').on('click', function() {
    clearErrors();

    var name = $('input[name=food-name]').val();
    var calories = $('input[name=food-calories]').val();

    if(name && calories) {
      addFood(name, calories)
      .done(function(food) {
        location.reload();
      })
    }
    else {
      generateErrors(name, calories);
    }
  });

  $(document.body).on('click', '.food-delete', function() {
    var row = $(this).parent();
    var foodID = parseInt(row.children('.food-id').text());

    deleteFood(foodID);
  });

  $(document.body).on('click', '.food-field', function() {
    var previousContents = $(this).html();
    var foodNameToUpdate = $(this).parent('tr').children('td.food-name').text();
    deleteOldFoodFromFoods(foodNameToUpdate);

    $(this).html(
      "<input type='text' name='new-contents' value=" + previousContents + ">"
    );

    var input = $(this).children('input[name=new-contents]');
    input.focus().val(input.val()); // focus on input and put cursor at the end

    $(this).removeClass('food-field');

    $(document.body).on('keypress', 'input[name=new-contents]', function(e) {
      var key = e.which;
      if(key == 13) // the enter key code
        {
          $(this).blur();
        }
    });

    $(document.body).on('blur', 'input[name=new-contents]', function() {
      var newContents = $(this).val();
      var td = $(this).parent('td');
      td.addClass('food-field');
      td.html(newContents);

      var newName = td.parent('tr').children('td.food-name').text();
      var newCalories = td.parent('tr').children('td.food-calories').text();

      updateLocalStorageMealFoods(foodNameToUpdate, newName, newCalories);
    });
  });

  $(document.body).on('click', '.food-delete', function() {
    var row = $(this).parent();
    row.remove();
  });

  $(document.body).on('click', '.sort-by-calories', function() {
    var rows = $('#food-list .food-row')
    rows.remove();
    if (!$(this).attr('class').includes('asc')) { // if it does not have class asc
      $(this).addClass('asc');
      $(this).removeClass('desc');
      var sortedFoods = sortAsc();
      displayFoods(sortedFoods);
    } else {
      $(this).addClass('desc');
      $(this).removeClass('asc');
      var sortedFoods = sortDesc();
      displayFoods(sortedFoods);
    }
  });
})

function addFood(name, calories) {
  var API = 'https://qs-node-dr.herokuapp.com';
  var food = {'name': name, 'calories': calories };

  return $.ajax({
    url: API + '/api/foods',
    type: 'POST',
    data: food
  })
}

function deleteFood(id) {
  var API = 'https://qs-node-dr.herokuapp.com';

  return $.ajax({
    url: API + '/api/foods/' + id,
    type: 'DELETE'
  })
}

function displayFoods() {
  getFoods()
  .done(function(foods) {
    foods.forEach(function(food) {
      Markup.appendFoodsRow(food);
    })
  })
};

function clearInput() {
  $('input[name=food-name]').val('');
  $('input[name=food-calories]').val('');
}

function generateErrors(name, calories) {
  if(!name){
    $('#name-field .validation-error').html('Please Enter a Name');
  }
  if(!calories){
    $('#calories-field .validation-error').html('Please Enter Calories');
  }
}

function clearErrors() {
  $('#name-field .validation-error').empty();
  $('#calories-field .validation-error').empty();
}

function deleteOldFoodFromFoods(foodNameToUpdate) {
  for (i = 0; i < foods.length; ++i) {
    if (foods[i]["name"] == foodNameToUpdate) {
      foods.remove(i);
      break;
    }
  }
}

function updateLocalStorageMealFoods(foodNameToUpdate, newName, newCalories) {
  for (i=0; i < mealFoods.length; ++i) {
    if (mealFoods[i]["name"] == foodNameToUpdate) {
      var meal = mealFoods[i]["meal"];
      mealFoods.remove(i);
      var newMealFood = {name: newName, calories: newCalories, meal: meal};
      mealFoods.push(newMealFood);
      localStorage.setItem('mealFoodsList', JSON.stringify(mealFoods));
    }
  }
}

function sortAsc() {
  return foods.sort(function (a,b) {
    return parseFloat(a["calories"]) - parseFloat(b["calories"]);
  });
}

function sortDesc() {
  return foods.sort(function (a,b) {
    return parseFloat(b["calories"]) - parseFloat(a["calories"]);
  });
}
