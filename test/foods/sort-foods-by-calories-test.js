describe('Sort Foods by Calories', function() {

  beforeEach(function() {
    //Clear out all the things
    $ = document.getElementById("foods-frame").contentWindow.$;
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  it('sorts the foods by ascending calories on first click', function() {

  });

  it('sorts the foods by descending calories on second click', function() {

  });

  it('sorts the foods back to ascending calories on third click', function() {

  });

  it('sorts the foods back to descending calories on fourth click', function() {
    
  });

  it('does not persist any sorting after reloading the page', function() {

  });
});
