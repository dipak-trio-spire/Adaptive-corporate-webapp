import React from "react";
import { Helmet } from "react-helmet";
import Head from 'next/head';


export default function Header({ content, page_head, description, keywords, info, showinfo }) {
    const [hshow, hsetShow] = React.useState(!showinfo);

    return (
        <>
            <Head>
                <title>{content}</title>
                <meta property="og:title" content={content} />
                <meta property="og:site_name" content="Adaptive Investments" />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "Assets/Adaptive-Platform-Illustration.png"} />
                <meta name="keywords" content={keywords} />
            </Head>
            {showinfo === true ?
                (<div className="sectionhead" >
                    <h1 className='collapsehead'>{page_head} <span className="arrwcol" onClick={() => hsetShow(!hshow)}></span></h1>
                    {hshow && <div className="infoblock"><p>{info}</p></div>}
                    <p>Powered by <span className="c-secondary">Adaptive</span></p>
                </div>
                ) : (
                    <div className="sectionhead" >
                        <h1>{page_head}</h1>
                        {/* <p>Powered by <span className="c-secondary">Adaptive</span></p> */}
                        <p>Powered by <a href="https://www.adaptive-investments.com" target="_blank" className="c-secondary">Adaptive</a></p>
                    </div>
                )}

        </>
    )
}
