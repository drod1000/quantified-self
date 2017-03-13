$('document').ready(function() {
  $('#add-food').on('click', function() {
    clearErrors();

    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();

    if(name && calories) {
      appendRow(name, calories);
    }
    else {
      generateErrors(name, calories);
    }
  })

  $(document.body).on('click', '.food-delete', function() {
    var row = $(this).closest('tr');

    row.remove();
  })

  $(document.body).on('keyup', '#food-filter', function() {
    var input = $(this).find('input').val().toLowerCase();

    $('.food-row').show();

    $('.food-row').filter(':not(:contains('+ input + '))').hide();
  })
})

function appendRow(name, calories) {
  var markup = generateRow(name, calories);
  $('#food-list').append(markup);

  clearInput();
};

function clearInput() {
  $('input[name=food-name]').val('');
  $('input[name=food-calories]').val('');
}

function generateRow(name, calories) {
  return "<tr class='food-row'><td class='food-name'>" + name + "</td>" + "<td class='food-calories'>" + calories + "</td>" + "<td class='food-delete'><button>-</button></td>" + "</tr>"
};

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
