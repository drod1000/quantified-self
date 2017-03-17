beforeEach(function() {
  $ = document.getElementById("index-frame").contentWindow.$;
  breakfastTable = $('.breakfast-list');
  lunchTable = $('.lunch-list');
  dinnerTable = $('.dinner-list');
  snacksTable = $('.snacks-list');
  tables = [breakfastTable, lunchTable, dinnerTable, snacksTable]
  addFoodList = $('#add-food-list')
});

describe('.:meal-list', function() {
  it('can calculate total calories', function() {
    tables.forEach(function(table) {
      var total = 0;
      foodRows = table.children('tbody').children()

      for(var i = 0; i < foodRows.length; i++) {
        calorieAmount = parseInt($(foodRows[i]).children('.food-calories').text())
        total += calorieAmount
       }
      totalCellValue = parseInt(table.children('tfoot').children('tr:nth-child(1)').children('td:nth-child(2)').text())

      assert.equal(totalCellValue, total)
    });
  });
});
