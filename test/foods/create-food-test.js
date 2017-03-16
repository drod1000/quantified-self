describe('Create Food', function() {

  beforeEach(function() {
    //Clear out all the things
    $ = document.getElementById("foods-frame").contentWindow.$;
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  context('validations', function() {

    it('will tell me if I fail to enter a name', function() {
      $('#calories-field input').val('35');
      $('#add-food').click();
      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "Please Enter a Name");
    });

    it('will tell me if I fail to enter calories', function() {
      $('#name-field input').val('Banana');
      $('#add-food').click();
      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "Please Enter Calories");
    });

    it('will be nice to me if I do everything correctly', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('35');
      $('#add-food').click();

      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "");

      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "");
    });
  });

  context('add new food', function() {
    it('adds a food row to the top of the foods.html table', function() {

    });

    it('persists the added food row after refreshing foods.html', function() {

    });

    it('adds a food row to the index.html food table', function() {

    });
  });
});
