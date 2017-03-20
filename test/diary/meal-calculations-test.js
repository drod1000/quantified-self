beforeEach(function() {
  $ = document.getElementById("index-frame").contentWindow.$;
  breakfastTable = $('.breakfast-list');
  lunchTable = $('.lunch-list');
  dinnerTable = $('.dinner-list');
  snacksTable = $('.snacks-list');
  tables = [breakfastTable, lunchTable, dinnerTable, snacksTable]
  addFoodList = $('#add-food-list')

  var mealFoods = [{"name":"banana","calories":"34","meal":".breakfast-list"}, {"name":"French Silk Pie", "calories":"340", "meal":".breakfast-list"}, {"name":"Orange", "calories":"34", "meal":".lunch-list"},
  {"name":"Orange", "calories":"890", "meal":".lunch-list"},
  {"name":"Salad", "calories":"240", "meal":".dinner-list"}, {"name":"Cauliflower", "calories":"80", "meal":".dinner-list"}, {"name":"Chicken Breast", "calories":"210", "meal":".dinner-list"},
  {"name":"Dark Chocolate", "calories":"150", "meal":".snacks-list"},
  {"name":"Beef Jerky", "calories":"95", "meal":".snacks-list"}];
  localStorage.setItem('mealFoodsList', JSON.stringify(mealFoods));
});

afterEach(function() {
  localStorage.clear();
})

describe('.:meal-list', function() {
  it('can calculate total calories', function() {
    tables.forEach(function(table) {
      var total = 0;
      foodRows = table.children('tbody').children();

      for(var i = 0; i < foodRows.length; i++) {
        calorieAmount = parseInt($(foodRows[i]).children('.food-calories').text())
        total += calorieAmount;
       }
      totalCellValue = parseInt(table.children('tfoot').children('tr:nth-child(1)').children('td:nth-child(2)').text());

      assert.equal(totalCellValue, total)
    })
  })

  it('can calculate remaining calories', function(done) {
    var remainingCell = breakfastTable.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)');

    done();

    assert.equal(remainingCell.text(), '26')

    var remainingCell = lunchTable.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)');

    assert.equal(remainingCell.text(), '-324')

    var remainingCell = dinnerTable.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)');

    assert.equal(remainingCell.text(), '270')

    var remainingCell = snacksTable.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(2)');

    assert.equal(remainingCell.text(), '-45')
  })
});
