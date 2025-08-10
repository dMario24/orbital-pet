import type { Metadata } from 'next'

// This will be replaced by the actual production URL
const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Orbital Pet Lab',
  description: 'A sneak peek at the upcoming Orbital Pet service. Come play with a virtual satellite!',
  openGraph: {
    title: 'Orbital Pet Lab',
    description: 'A sneak peek at the upcoming Orbital Pet service.',
    url: `${siteUrl}/lab`,
    siteName: 'Orbital Pet',
    images: [
      {
        url: `${siteUrl}/satellite_placeholder.png`, // Absolute URL for the image
        width: 800,
        height: 600,
        alt: 'An image of the Orbital Pet satellite',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbital Pet Lab',
    description: 'A sneak peek at the upcoming Orbital Pet service. Come play with a virtual satellite!',
    images: [`${siteUrl}/satellite_placeholder.png`],
  },
}

export default function LabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
