const { MF_PUBLIC_ONLY, MF_AUTH_ONLY, MF_MIXED } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // MF que tem todas as rotas de acesso públicos
      {
        source: "/", // grupo de controle
        destination: `${MF_PUBLIC_ONLY}/public-only`, // MF responsável
      },
      // O objeto abaixo pode levar a comportamentos inesperados
      // devido a possibilidade de conflito com as demais rotas
      // caso tenham os mesmos nomes
      {
        source: "/:path",
        destination: `${MF_PUBLIC_ONLY}/public-only/:path*`,
      },
      // MF que tem todas as rotas autenticadas
      //
      // Obs.: Cada deve configurar o próprio middleware com next-auth
      // {
      //   source: "/auth-only",
      //   destination: `${MF_AUTH_ONLY}/auth-only`,
      // },
      // {
      //   source: "/auth-only/:path",
      //   destination: `${MF_AUTH_ONLY}/auth-only/:path*`,
      // },
      // // MF que tem rotas públicas e autenticadas
      // {
      //   source: "/mixed",
      //   destination: `${MF_MIXED}/mixed`,
      // },
      // {
      //   source: "/mixed/:path",
      //   destination: `${MF_MIXED}/mixed/:path*`,
      // },
    ]
  },
  async redirects() {
    return [
      // Redireciona ao login do next-auth no main, quando
      // ocorre tentativa de acesso não autenticado em outros MF
      //
      // Obs.: Não deve modificar as configurações padrões de
      // page do next-auth [...next-auth].ts dos MFs
      //
      // Obs.: Caso alterer a tela de login do next-auth da main
      // deve ser alterado aqui, mas NUNCA nos demais MFs
      {
        source: '/(.*)/api/auth/signin',
        destination: `/api/auth/signin`,
        permanent: false,
      }
    ]
  },
}

module.exports = nextConfig
