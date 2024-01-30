const { NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_MAIN_MF_URL } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Em desenvolvimento vai ser acessado como http://localhost:3000/public-only
  // no MF main é possível configurar para qualquer outra rota, mas o mais ideal
  // é que ambas tenham a mesma nomeclatura
  basePath: "/public-only",

  // Configura para que os recursos (css, js, etc) sejam baixados da URL de deploy
  // desse MF, caso contrário, o MF vai tentar baixar do MF main, resultado em 404
  //
  // Obs.: Comente a linha abaixo caso esteja desenvolvendo fora de forma extena aos
  // microfrontends (caso opte por desenvolver o app e depois conectar aos MF main)
  assetPrefix: `${NEXT_PUBLIC_BASE_URL}/public-only`,


  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Permite que o MF main baixe os recursos do MF atual (css, js, etc)
          //
          // Obs.: Importante definir o assetPrefix
          { key: "Access-Control-Allow-Origin", value: "*" }
        ]
      },
    ]
  }
}

module.exports = nextConfig
