var vs = require('../../../query/reverse_defaults');

module.exports = {
  'query': {
    'filtered': {
      'query': {
        'bool': {
          'must': []
        }
      },
      'filter': {
        'bool': {
          'must': [
            {
              'geo_distance': {
                'distance': '500km',
                'distance_type': 'plane',
                'optimize_bbox': 'indexed',
                '_cache': true,
                'center_point': {
                  'lat': 0,
                  'lon': 0
                }
              }
            }
          ]
        }
      }
    }
  },
  'sort': [
    '_score',
    {
      '_geo_distance': {
        'center_point': {
          'lat': 0,
          'lon': 0
        },
        'order': 'asc',
        'distance_type': 'plane'
      }
    }
  ],
  'size': vs.size,
  'track_scores': true
};
