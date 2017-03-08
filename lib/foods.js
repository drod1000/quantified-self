$('document').ready(function() {
  $("#add-food").on('click', function() {
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();

    appendRow(name, calories);

    $('#name-field .validation-error').html('Please Enter a Name');
    $('#calories-field .validation-error').html('Please Enter Calories');
  })
})

function appendRow(name, calories) {
  var markup = generateRow(name, calories);
  $('#food-list').append(markup);
};

function generateRow(name, calories) {
  return "<tr class='food-row'><td class='food-name'>" + name + "</td>" + "<td class='food-calories'>" + calories + "</td>" + "<td class='food-delete'><button>-</button></td>" + "</tr>"
};
