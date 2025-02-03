import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gantt generator',
  applicationName: 'Gantt Chart Generator',
  description: 'Created by Philibert Gentien',
  authors: [
    {
      name: 'Philibert Gentien',
      url: "https://philibert-gentien.digitalprojects.fr/",
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
