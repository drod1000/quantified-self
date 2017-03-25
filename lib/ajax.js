class Ajax {
  static getFoods() {
    var API = 'https://qs-node-dr.herokuapp.com';

    return $.ajax({
      url: API + '/api/foods',
      type: 'GET',
    })
  }
}
