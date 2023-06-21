import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'QR Code Scanner',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="relative h-screen flex flex-col" >
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    )
}

