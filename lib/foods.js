$('document').ready(function() {
  var foods = JSON.parse(localStorage.getItem('foodsList')) || [];
  displayFoods(foods);

  $('#add-food').on('click', function() {
    clearErrors();

    var name = $('input[name=food-name]').val();
    var calories = $('input[name=food-calories]').val();

    if(name && calories) {
      var newFood = {name: name, calories: calories}
      foods.push(newFood);
      localStorage.setItem('foodsList', JSON.stringify(foods));
      appendRow(newFood["name"], newFood["calories"])
    }
    else {
      generateErrors(name, calories);
    }
  });

  $(document.body).on('click', '.food-delete', function() {
    var row = $(this).parent().parent();

    row.remove();
  });

  $(document.body).on('click', '.food-field', function() {
    var previousContents = $(this).html();
    $(this).html(
      "<input type='text' name='new-contents' value=" + previousContents + ">"
    );

    var input = $(this).children('input[name=new-contents]');
    input.focus().val(input.val()); // focus on input and put cursor at the end

    $(this).removeClass('food-field');

    $(this).keypress(function (e) {
      var key = e.which;
      if(key == 13) // the enter key code
        {
          $(this).focusout();
        }
    });

    $(this).focusout(function() {
      var newContents = $(this).children('input[name=new-contents]').val();
      $(this).addClass('food-field');
      $(this).html(newContents);
    });
  });
})

function displayFoods(foods) {
  if(foods){
    foods.forEach(function(food) {
      appendRow(food["name"], food["calories"]);
    });
  }
};

function appendRow(name, calories) {
  var markup = generateRow(name, calories);
  $('#food-list').prepend(markup);

  clearInput();
};

function generateRow(name, calories) {
  return "<tr class='food-row'>" +
            "<td class='food-name food-field'>" + name + "</td>" +
            "<td class='food-calories food-field right-align'>" + calories + "</td>" +
          "</tr>"
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
