import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterData } from "@/utils/fetchHelpers"
const Footer = ({ hostname }) => {
    const [loading, setLoading] = useState(true);
    const [FooterContent, setFooterContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const initialContent = await FooterData();
            if (initialContent && initialContent.code !== 'no_page') {
              setFooterContent(initialContent);
            } else {
              setFooterContent(null);   
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setFooterContent(null); 
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);


      console.log("FooterContent" ,FooterContent?.link_description)
    
    return (
        <div className="footer">
            <div className="sectiondivide">
                <div className="footertop">
                <Link href={hostname === "halo" ? "/" : "/"}>
                    <Image 
                    src={hostname === "halo" ? "../Assets/Halo/Halo-logo-1.svg" : "/Assets/adaptive-name.svg"} 
                    width={216} height={60} 
                    alt=""></Image>
                </Link>
                    {hostname === "main" &&
                        (<div className="socialicon">
                            <Link target="_blank" href="https://www.linkedin.com/company/adaptive-investments/"><Image src="../Assets/linkedin.svg" alt="" width={24} height={24}></Image></Link>
                            <Link target="_blank" href="https://twitter.com/adaptive_invest?lang=en"><Image src="../Assets/twitter.svg" alt="" width={24} height={24}></Image></Link>
                        </div>)}
                </div>
                {hostname === "main" &&
                    <div className="footerlink">
                        <div>
                            <h3>Who We Serve</h3>
                            <ul>
                                <li><Link href="/what-we-serve/advisors-wealth-managers">Advisors & Wealth Managers</Link></li>
                                <li><Link href="/what-we-serve/retail-investors">Retail Investors</Link></li>
                                <li><Link href="/what-we-serve/enterprises">Enterprises</Link></li>
                            </ul>
                        </div>
                        {/* <div>
                            <h3>Products</h3>
                            <ul>
                                <li><Link href="javscript:;">Adaptive Shield</Link></li>
                                <li><Link href="javscript:;">Adaptive Income <span className="commingsoon">Coming soon</span></Link></li>
                                <li><Link href="javscript:;">Black Swan <span className="commingsoon">Coming soon</span></Link></li>
                                <li><Link href="javscript:;">Crypto Shield <span className="commingsoon">Coming soon</span></Link></li>
                            </ul>
                        </div> */}
                        <div>
                            <h3>Tools</h3>
                            <ul>
                                <li><Link href="/tools/ppc">Protection Calculator</Link></li>
                                <li><Link href="/tools/riskcontribution">Risk Contribution</Link></li>
                                <li><Link href="/tools/factor_analysis">Factor Analysis</Link></li>
                                {/* <li><Link href="/tools/mc">Forward Test</Link></li> */}
                                <li><Link href="/tools/rw">Risk Weather</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>Company</h3>
                            <ul>
                                <li><Link href="/company/about-adaptive">About Adaptive</Link></li>
                                <li><Link href="/what-we-do">What We Do</Link></li>
                                <li><Link href="/company/faq">Resources</Link></li>
                                <li><Link href="/company/blog">Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
            {hostname === "main" ? (
                <div className="sectiondivide bottomfoot">
                    <div className="footerbottom">
                        <ul className="termlink">
                            <li><Link href="https://files.adviserinfo.sec.gov/IAPD/Content/Common/crd_iapd_Brochure.aspx?BRCHR_VRSN_ID=843770" target="_blank">ADV Part 2</Link></li>
                            <li><Link href="https://reports.adviserinfo.sec.gov/crs/crs_318716.pdf" target="_blank">CRS</Link></li>
                            <li><Link href="https://brokercheck.finra.org/" target="_blank">FINRA BrokerCheck</Link></li>
                            {/* <li><Link href="javascript:;">Privacy Policy</Link></li> */}
                        </ul>
                        <p dangerouslySetInnerHTML={{__html : FooterContent?.link_description?.replace(/<p>/g, "").replace(/<\/p>/g,"")}}></p>
                    </div>
                </div>) : (
                <div className="sectiondivide bottomfoot">
                    <div className="footerbottom">
                        <p>
                            Halo Investing is not a broker/dealer. Securities offered through Halo Securities LLC, a SEC-registered broker/dealer and member of FINRA/SIPC. Halo Securities LLC is affiliated with Halo Investing. Halo Securities LLC acts solely as distributor/selling agent and is not the guarantor of any structured note products. Check the background of Halo Securities LLC on FINRA BrokerCheck. 2023 © Halo Investing
                        </p>
                        <p>Adaptive Investment Solutions LLC is not a broker/dealer. Investment advice is offered through Adaptive Advisers LLC, a SEC-registered advisor which is affiliated with Adaptive Investment Solutions LLC. Adaptive Advisers LLC is not the guarantor of any downside protection. Check the background of Adaptive Advisers LLC on FINRA BrokerCheck. <br></br>2023 © Adaptive Investment Solutions LLC</p>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default Footer;
