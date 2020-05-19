import Head from 'next/head'
import Link from 'next/link'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>GraphQL API - Covid19 API by ncovindias.xyz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/api/graphql"><a style={{ fontWeight: "bold" }}>Visit API playground</a></Link>
        <div>
          API Endpoint: https://api.ncovindias.xyz/api/graphql
        </div>
      </main>
    </div>

  )
}
