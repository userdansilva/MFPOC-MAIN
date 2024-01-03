import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Alert } from './components/Alert'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'POC MF - Mixed',
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <AuthProvider>
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="space-y-10">
          <Alert>
            Você está acessando um MF externo ao App principal: Mixed
          </Alert>

          <Container>
            <div className="space-y-10">
              <Navbar />

              <p>
                Você está no MF chamado Mixed, é um exemplo de micro-frontend, que mistura
                páginas autenticadas e públicas. Abaixo estão algumas URLs desse MF.
              </p>

              <div>{children}</div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  </AuthProvider>
)

export default RootLayout;

/** types */
type RootLayoutProps = {
  children: React.ReactNode;
}
