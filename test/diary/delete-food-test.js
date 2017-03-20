beforeEach(function() {
  $ = document.getElementById("index-frame").contentWindow.$;
  breakfastTable = $('.breakfast-list');

  var mealFoods = [{"name":"Banana","calories":"34","meal":".breakfast-list"}, {"name":"French Silk Pie", "calories":"340", "meal":".breakfast-list"}];
  localStorage.setItem('mealFoodsList', JSON.stringify(mealFoods));
});

afterEach(function() {
  localStorage.clear();
})

describe('.breakfasttable', function() {
  it('can delete a food', function(done) {
    var remainingCell = breakfastTable.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)');

    var deleteButton = breakfastTable.children('tbody').children('tr:nth-child(2)').children('.food-delete');

    done();

    deleteButton.click();

    assert.equal(remainingCell.text(), '366')
  })
})
