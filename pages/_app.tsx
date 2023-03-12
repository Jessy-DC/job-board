import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider, SessionProviderProps} from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps: {
    session, ...pageProps
} }: AppProps<SessionProviderProps>) {
  return <>
    <NextNProgress />
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </>
}
