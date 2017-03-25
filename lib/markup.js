class Markup {
  static generateFoodsRow(food) {
    return "<tr class='food-row'>" +
              "<td class='food-id food-field'>" + food.id + "</td>" +
              "<td class='food-name food-field'>" + food.name + "</td>" +
              "<td class='food-calories food-field right-align'>" + food.calories + "</td>" +
              "<td class='food-delete'><button>-</button></td>"
            "</tr>"
  }

  static appendFoodsRow(food) {
    var markup = Markup.generateFoodsRow(food);
    $('#food-list').prepend(markup);

    clearInput();
  }

  static generateIndexRow(food) {
    return "<tr class='food-row'>" +
              "<td><input type='checkbox' /></td>" +
              "<td class='food-id food-field'>" + food.id + "</td>" +
              "<td class='food-name food-field'>" + food.name + "</td>" +
              "<td class='food-calories food-field right-align'>" + food.calories + "</td>" +
            "</tr>"
  }

  static appendIndexRow(food) {
    var markup = Markup.generateIndexRow(food);
    $('#add-food-list').prepend(markup);
  }
}
