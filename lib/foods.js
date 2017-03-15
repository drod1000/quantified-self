$('document').ready(function() {
  $('#add-food').on('click', function() {
    clearErrors();

    var name = $('input[name=food-name]').val();
    var calories = $('input[name=food-calories]').val();

    if(name && calories) {
      appendRow(name, calories);
    }
    else {
      generateErrors(name, calories);
    }
  });

  $(document.body).on('click', '.food-field', function() {
    var previousContents = $(this).html();
    $(this).html(
      "<input type='text' name='new-contents' value=" + previousContents + ">"
    );
    $(this).removeClass('food-field');

    $(this).keypress(function (e) {
      var key = e.which;
      if(key == 13) // the enter key code
        {
          $(this).focusout();
        }
    });

    $(this).focusout(function() {
      var newContents = $("input[name=new-contents]").val();
      $(this).html(newContents);
      $(this).addClass('food-field');
    });
  });
})

function appendRow(name, calories) {
  var markup = generateRow(name, calories);
  $('#food-list').append(markup);

  clearInput();
};

function generateRow(name, calories) {
  return "<tr class='food-row'>" +
            "<td class='food-name food-field'>" + name + "</td>" +
            "<td class='food-calories food-field right-align'>" + calories + "</td>" + "<td class='food-delete'><button>-</button></td>" +
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
