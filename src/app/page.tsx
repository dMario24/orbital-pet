import { LandingPage } from '@/components/LandingPage';

export const revalidate = 60; // Revalidate at most every 60 seconds

export default function HomePage() {
  return <LandingPage />;
}
