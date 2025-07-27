import type { Metadata } from 'next'
import './globals.css'
import './fonts.css'
import '../styles/cursor.css'
import CustomCursor from '@/components/custom-cursor'

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

/* Hide default cursor for custom cursor */
* {
  cursor: none !important;
}

/* Show default cursor for text inputs */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="search"],
input[type="url"],
input[type="tel"],
input[type="number"],
textarea,
[contenteditable="true"] {
  cursor: text !important;
}
        `}</style>
      </head>
      <body className="font-naroline">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
