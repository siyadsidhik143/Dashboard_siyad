import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { CssBaseline, Box, Toolbar } from '@mui/material'

export const metadata = {
  title: 'CRM Dashboard',
  description: 'Next.js CRM UI with MUI'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Header />
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f5fa', minHeight: '100vh' }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </body>
    </html>
  )
}
