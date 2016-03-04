var localNamingConventions = require('../../../middleware/localNamingConventions');

module.exports.tests = {};

// ref: https://github.com/pelias/pelias/issues/141
module.exports.tests.flipNumberAndStreet = function(test, common) {

  var ukAddress = {
    '_id': 'test1',
    '_type': 'test',
    'name': { 'default': '1 Main St' },
    'center_point': { 'lon': -7.131521, 'lat': 54.428866 },
    'address': {
       'zip': 'BT77 0BG',
       'number': '1',
       'street': 'Main St'
    },
    'parent': {
      'region': 'Dungannon',
      'country_a': 'GBR',
      'country': 'United Kingdom'
    }
  };

  var deAddress = {
    '_id': 'test2',
    '_type': 'test',
    'name': { 'default': '23 Grolmanstraße' },
    'center_point': { 'lon': 13.321487, 'lat': 52.506781 },
    'address': {
       'zip': '10623',
       'number': '23',
       'street': 'Grolmanstraße'
    },
    'parent': {
      'region': 'Berlin',
      'locality': 'Berlin',
      'country_a': 'DEU',
      'county': 'Berlin',
      'country': 'Germany',
      'neighbourhood': 'Hansaviertel'
    }
  };

  var req = {},
      res = { data: [ ukAddress, deAddress ] },
      middleware = localNamingConventions();

  test('flipNumberAndStreet', function(t) {

    middleware( req, res, function next(){

      // GBR address should be a noop
      t.equal( res.data[0].name.default, '1 Main St', 'standard name' );

      // DEU address should have the housenumber and street name flipped
      // eg. '101 Grolmanstraße' -> 'Grolmanstraße 101'
      t.equal( res.data[1].name.default, 'Grolmanstraße 23', 'flipped name' );

      t.end();
    });
  });

};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('[middleware] localNamingConventions: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
