beforeEach(function() {
  $ = document.getElementById("index-frame").contentWindow.$;
  addFoodList = $('#add-food-list');
  breakfastTable = $('.breakfast-list');

  var foods = [{"name":"Banana","calories":"120"}, {"name":"Apple", "calories":"60"}]
  localStorage.setItem('foodsList', JSON.stringify(foods));
});

afterEach(function() {
  localStorage.clear();
})

describe('#add-food-list', function() {
  it('can add food to a meal list', function(done) {
    done();

    addFoodList.children('tbody').children('.food-row').children('td:nth-child(1)').children('input:checkbox').prop("checked", true);

    $('#breakfast').click();

    foodRow = breakfastTable.children('tbody').children('.food-row');
    foodRowName = foodRow.children('.food-name').text()
    foodRowCalories = foodRow.children('.food-calories').text();

    assert.equal(foodRowName, 'Banana');
    assert.equal(foodRowCalories, '120');
  })
})

describe('.:meal-list', function() {
  it('updates total calories after adding food', function(done) {
    done();

    addFoodList.children('tbody').children('.food-row:nth-child(1)').children('td:nth-child(1)').children('input:checkbox').prop("checked", true);
    addFoodList.children('tbody').children('.food-row:nth-child(2)').children('td:nth-child(1)').children('input:checkbox').prop("checked", true);

    $('#breakfast').click();

    var totalCalories = breakfastTable.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)').text();

    assert.equal(totalCalories, '180');
  })
})
