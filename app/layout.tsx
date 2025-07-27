import type { Metadata } from 'next'
import './globals.css'
import './fonts.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: 'Naroline', sans-serif;
  --font-naroline: 'Naroline';
}
        `}</style>
      </head>
      <body className="font-naroline">{children}</body>
    </html>
  )
}
