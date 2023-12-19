import Link from "next/link";

export const Navbar: React.FC = () => (
  <ul className="inline-flex gap-10">
    <li className="underline underline-offset-2">
      {/* 
      É necessário passar a URL do MF principal, caso contrário
      a aplicação vai usar o basePath (next.config.js) como base
      de navegação resultando na url: http://localhost:3000/public-only/

      Isso só acontece porque o MF principal está usando a URL: http://localhost:3000
      ao invés do padrão esperado: http://localhost:3000/public-only/
      */}
      <Link href={process.env.NEXT_PUBLIC_MAIN_MF_URL as string}>
        Home (Public Only)
      </Link>
    </li>

    <li>
      {/* 
      A navegação entre MFs faz o full reload na página, logo
      deve-se usar a anchor padrão do HTML.
      
      Caso seja usado Link, pode resultar em uma não atualização
      do conteúdo da tela
      */}
      <a href={`${process.env.NEXT_PUBLIC_MAIN_MF_URL}/auth-only`}>
        Auth Only
      </a>
    </li>

    <li>
      <a href={`${process.env.NEXT_PUBLIC_MAIN_MF_URL}/mixed`}>
        Mixed (Public + Auth)
      </a>
    </li>
  </ul>
)
