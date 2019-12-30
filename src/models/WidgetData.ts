export type WidgetType = 'heatMap' | 'streetView' | 'severityGraph'

export interface IWidgetData {
  type: WidgetType,
  meta: {
    tags: Array<string>,
    categories: Array<string>
  },
  data: any
}
