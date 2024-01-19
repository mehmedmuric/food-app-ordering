import { Roboto } from 'next/font/google';
import './globals.css'
import Header from './components/Header/Header';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700',] })

export const metadata = {
  title: 'Mehmed Muric',
  description: 'NEXT APP',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <Header />
        {children}
          <footer className="border-t p-8 text-center text-gray-500 font-semibold">
            &copy; 2024 All rights reserved Mehmed Muric
          </footer>
        </main>
      </body>
    </html>
  )
}
