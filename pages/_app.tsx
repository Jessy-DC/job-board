import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NextProgress from 'nextjs-progressbar'
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <NextProgress />
    <Component {...pageProps} />
  </>
}
