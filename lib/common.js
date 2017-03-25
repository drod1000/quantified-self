var mealFoods = JSON.parse(localStorage.getItem('mealFoodsList')) || [];

$('document').ready(function() {
  $(document.body).on('keyup', '.food-filter', function() {
    var input = $('input[name=food-name-filter]').val().toLowerCase();
    $('.food-row').show();

    $('.food-row').each(function() {
      var foodName = $(this).children('td.food-name').text().toLowerCase();
      if ( foodName.includes(input) ) {
      } else {
        $(this).hide();
      }
    });
  });
});

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
