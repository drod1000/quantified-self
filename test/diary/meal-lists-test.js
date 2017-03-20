beforeEach(function() {
  $ = document.getElementById("index-frame").contentWindow.$;
  breakfastTable = $('.breakfast-list');
  lunchTable = $('.lunch-list');
  dinnerTable = $('.dinner-list');
  snacksTable = $('.snacks-list');
  tables = [breakfastTable, lunchTable, dinnerTable, snacksTable]
});
describe('.:meal-list', function() {

  it('has a caption', function() {
    var caption = breakfastTable.find('caption').text();
    assert.equal(caption, "Breakfast");

    var caption = lunchTable.find('caption').text();
    assert.equal(caption, "Lunch");

    var caption = dinnerTable.find('caption').text();
    assert.equal(caption, "Dinner");

    var caption = snacksTable.find('caption').text();
    assert.equal(caption, "Snacks");
  });

  it('has food name and calories headers', function() {
    tables.forEach(function(table) {
      var nameHeaderCell = table.children('thead').children('tr').children('th:nth-child(1)').text()
      var calorieHeaderCell = table.children('thead').children('tr').children('th:nth-child(2)').text()

      assert.equal(nameHeaderCell, 'Name');
      assert.equal(calorieHeaderCell, 'Calories');
    });
  });

  it('has total and remaining calories footers', function() {
    tables.forEach(function(table) {
      var totalCell = table.children('tfoot').children('tr:nth-child(1)').children('td:nth-child(1)').text()
      var remainingCell = table.children('tfoot').children('tr:nth-child(2)').children('td:nth-child(1)').text()

      assert.equal(totalCell, 'Total Calories');
      assert.equal(remainingCell, 'Remaining Calories');
    });
  });
});
