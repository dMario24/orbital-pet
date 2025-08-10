import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || 'TEST_API_KEY';

export const initAmplitude = () => {
  if (typeof window !== 'undefined') {
    amplitude.init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        pageViews: true,
        sessions: true,
        formInteractions: true,
      },
    });
  }
};

export const trackAmplitudeEvent = (eventName: string, eventProperties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    amplitude.track(eventName, eventProperties);
    console.log(`[Amplitude] Event tracked: ${eventName}`, eventProperties);
  }
};
