import { StrictMode } from 'react';
import { Navbar } from '../components/navbar';

import 'bootstrap/dist/css/bootstrap.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StrictMode>
    <Navbar />
      <html lang="en">
        <body>
	  <div className="container text-center">
	    {children}
	  </div>
	</body>
      </html>
    </StrictMode>
  )
}
