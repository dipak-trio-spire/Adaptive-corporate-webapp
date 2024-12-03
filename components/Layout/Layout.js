import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Head from "next/head";

export default function Layout({ children, hostname }) {
    return (
        <>
        <Head>
        <link rel="icon" href="/favicon.ico"  />
        </Head>
            <Navbar hostname={hostname} />
            <main className="maindiv">{children}</main>
            <Footer hostname={hostname} />
        </>
    );
}
