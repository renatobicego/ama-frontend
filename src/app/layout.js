import './globals.css'

export const metadata = {
  title: 'AMA',
  description: 'Aplicación web de la asociación mendocina de altetismo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
