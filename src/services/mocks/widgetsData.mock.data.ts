import {WidgetType} from '../../models/WidgetData';

export default [
  {
    "type": "heatMap" as WidgetType,
    "meta": {
      "tags": ['tag1'],
      "categories": ['cat1']
    },
    "data": {}
  },
  {
    "type": "heatMap" as WidgetType,
    "meta": {
      "tags": ['tag1', 'tag2'],
      "categories": ['cat1', 'cat2']
    },
    "data": {}
  },
]
