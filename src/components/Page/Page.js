import { Helmet } from "react-helmet";


const Page = ({ children, className, title }) => {
    return (
        <>
            <Helmet>
                <title>{title ? `${title} | Blink` : "Blink"}</title>
            </Helmet>
            <main className={className}>
                {children}
            </main>
        </>
    )
}

export default Page
