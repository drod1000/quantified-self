class Ajax {
  static getFoods() {
    var API = 'https://qs-node-dr.herokuapp.com';

    return $.ajax({
      url: API + '/api/foods',
      type: 'GET',
    })
  }

  static createFood(name, calories) {
    var API = 'https://qs-node-dr.herokuapp.com';
    var food = {'name': name, 'calories': calories };

    return $.ajax({
      url: API + '/api/foods',
      type: 'POST',
      data: food
    })
  }
}
