import type { ReactNode } from "react"


function Page({ children }: { children: ReactNode }) {
    return (
        <main className="main">
            {children}
        </main>
    )
}

export default Page