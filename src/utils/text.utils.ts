import { IWidgetInjuredBySeverityTextData } from '../models/WidgetData';


export const getInjuredBySeverityVerbLabel = (data : IWidgetInjuredBySeverityTextData) : string  => {
  return  data.items.killed_count ? 'killedAndHurt' : 'hurt';
}
