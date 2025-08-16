type GTMEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTMEvent) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'customEvent',
      event_name: action,
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
