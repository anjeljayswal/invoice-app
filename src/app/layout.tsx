import { Providers } from './providers'
import "./globals.css";
import Navbar from './component/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          
          <main>
            {children}

          </main>
        </Providers>
      </body>
    </html>
  )
}