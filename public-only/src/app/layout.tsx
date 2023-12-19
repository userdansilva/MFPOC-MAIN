import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Alert } from './components/Alert'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'POC MF - Public Only',
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="pt-BR">
    <body className={inter.className}>
      <main className="space-y-10">
        <Alert>
          Você está acessando um MF externo ao App principal: Public Only
        </Alert>

        <Container>
          <div className="space-y-10">
            <Navbar />

            <p>
              Você está no MF chamado Public Only, é um exemplo de micro-frontend, em que
              todas as páginas dele são públicas. Abaixo estão algumas URLs desse MF.
            </p>

            <div>{children}</div>
          </div>
        </Container>
      </main>
    </body>
  </html>
)

export default RootLayout;

/** types */
type RootLayoutProps = {
  children: React.ReactNode;
}
