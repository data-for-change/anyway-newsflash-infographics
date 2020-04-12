// export type WidgetType = 'heatMap' | 'streetView' | 'severityGraph'
// interface IData {}
export type IWidgetsMeta = {
	location_info: {
		resolution: string
		road1: number
		road_segment_name: string
	}
}
export type IWidgetMostSevereAccidents = {
	name: string
	data: {
		longitude: number
		latitude: number
		accident_severity: string
		accident_timestamp: string
	}[]
	meta: {}
}
export type IWidgetAccidentsHeatMap = {
	name: string;
	data: {
		longitude: number;
		latitude: number;
	}[]
	meta: {};
};
export type IWidgetCountBySeverity = {
	name: string
	data: {
		accident_severity: string
		count: number
	}[]
	meta: {}
}
export type IWidgetAccidentsByType = {
	name: string
	data: {
		accident_type: string
		count: number
	}[]
	meta: {}
}
export type IWidgetAccidentsByYear = {
	name: string
	data: {
		accident_year: number
		count: number
	}[]
	meta: {}
}
export type IWidgetInjuredByYear = {
	name: string;
	data: {
		accident_year: number;
		count: number;
	}[];
	meta: {};
};

export type IWidgetData = {
	meta: IWidgetsMeta
	widgets: IWidgetTypes[]
}
export type IWidgetTypes =
  | IWidgetMostSevereAccidents
  | IWidgetAccidentsHeatMap
  | IWidgetCountBySeverity
  | IWidgetAccidentsByType
  | IWidgetInjuredByYear
  | IWidgetAccidentsByYear;
