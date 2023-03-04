import {PropsWithChildren} from "react";
import Link from "next/link";

export interface Props {
    title?: string
}

export const Layout = ({title, children}: PropsWithChildren<Props>) => {
    return (
        <>
            <title>{title}</title>
            <header>
                <h1>My Job Board</h1>
                <nav>
                    <Link href="/">Home</Link> | <Link href="/about">About</Link>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}
