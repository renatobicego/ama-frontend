import Footer from './Footer/Footer'
import Header from './Header/Header'
import './globals.css'
import { Rubik, Krub } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Providers from './Providers'
import { Suspense } from 'react'
import Loading from './loading'

const rubik = Rubik({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
})

const krub = Krub({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-krub',
})

export const metadata = {
  title: 'AMA',
  description: 'Aplicación web de la Asociación Mendocina de Altetismo',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}


export default function RootLayout({ children }) {

  return (
    <html lang="en" className='bg-primary2 -z-30 relative'>
      <body className={`${rubik.variable} ${krub.variable} bg-white -z-20 relative overflow-x-hidden`}>
        <Providers>
          <Suspense fallback={<Loading />}>
            
              <Header />
              {children}
              <Footer />
          </Suspense>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
