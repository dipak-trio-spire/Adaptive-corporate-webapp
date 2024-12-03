import React, { useContext, useEffect, useState } from "react";
import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HeaderTextContext from "@/contexts/HeaderTextContext";
import Image from "next/image";

function Navbar({ hostname }) {
  const router = useRouter();
  const slug = router.query.slug;
  const headerText = useContext(HeaderTextContext);
  // Function to determine if a link is the active page
  const isActive = (path) => {
    const currentPath = router.pathname;
    return `/${slug}` === `${path}` ? 'active' : '';
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
  
      // Check if the current slug is webinars, faq, or thought-leadership
      if (slug === 'webinars' || slug === 'faq' || slug === 'thought-leadership') {
        setScrolled(false); // Ensure is-sticky is not applied
      } else if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
  
    document.addEventListener('scroll', handleScroll, { passive: true });
  
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, slug]);

  const url = process.env.NEXT_PUBLIC_URL;
  const url2 = process.env.NEXT_PUBLIC_URL_2;

  function opennav() {
    var element = document.getElementById("navigation");
    var element2 = document.getElementById("nav-toggle");
    element.classList.toggle("nav-open");
    element2.classList.toggle("nav-open");
  }

  return (
    <>
      <div className={`${styles.navwrap} ${scrolled ? "is-sticky" : ""}`}>
        {hostname !== "halo" && (
          <div className="bannerText">
            <p dangerouslySetInnerHTML={{ __html: headerText }}></p>
          </div>
        )}
        <div className="navbarwrapper">
          <Link
            className="navtoggle"
            id="nav-toggle"
            href="javascript:;"
            onClick={() => opennav()}
          >
            <span className=""></span>
            <span></span>
            <span></span>
          </Link>
          <nav className="navbar" id="navigation">
            {hostname === "halo" ? (
              <div id="logo" className="">
                <Link href="/home">
                  <Image
                    className="logo-nav logo-nav-left"
                    src="Assets/Halo/Halo-logo.svg"
                    alt=""
                  ></Image>
                </Link>
              </div>
            ) : (
              <>
                <div className="">
                  <Link href="/">
                    <Image
                      className="logo-nav"
                      src="/Assets/adaptive-name.svg"
                      width={216}
                      height={60}
                      alt=""
                    ></Image>
                  </Link>
                </div>
                <ul className="navbarmenu">
                  <li>
                    <Link
                      className={slug == undefined ? "active" : ""}
                      href="/"
                      onClick={() => {
                        opennav();
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={slug == "what-we-do" ? "active" : ""}
                      href="/what-we-do"
                      onClick={() => {
                        opennav();
                      }}
                    >
                      What We Do
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={isActive("/what-we-serve")}
                      href="javascript:;"
                    >
                      Who We Serve
                    </Link>
                    <ul className="submenu">
                      <li>
                        <Link
                          className={
                            slug == "advisors-wealth-managers" ? "active" : ""
                          }
                          onClick={() => {
                            opennav();
                          }}
                          href="/what-we-serve/advisors-wealth-managers"
                        >
                          Advisors & Wealth Managers
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={slug == "retail-investors" ? "active" : ""}
                          onClick={() => {
                            opennav();
                          }}
                          href="/what-we-serve/retail-investors"
                        >
                          Retail Investors
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={slug == "enterprises" ? "active" : ""}
                          onClick={() => {
                            opennav();
                          }}
                          href="/what-we-serve/enterprises"
                        >
                          Enterprises
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                      <Link className={isActive('/Product')} href="javascript:;">Products</Link>
                      <ul className="submenu">
                        <li><Link className={isActive('/Product/adaptive-shield')} onClick={() => { opennav(); }} href="/Product/adaptive-shield">Adaptive Shield</Link></li>
                        <li><Link className={isActive('/Product/adaptive-income')} onClick={() => { opennav(); }} href="/Product/adaptive-income">Adaptive Income <span className="commingsoon">Coming soon</span></Link></li>
                        <li><Link className={isActive('/Product/black-swan')} onClick={() => { opennav(); }} href="/Product/black-swan">Black Swan <span className="commingsoon">Coming soon</span></Link></li>
                        <li><Link className={isActive('/Product/crypto-shield')} onClick={() => { opennav(); }} href="/Product/crypto-shield">Crypto Shield <span className="commingsoon">Coming soon</span></Link></li>
                      </ul>
                    </li> */}
                  <li>
                    <Link className={isActive("/tools")} href="javascript:;">
                      Tools
                    </Link>
                    <ul className="submenu">
                      <li>
                        <Link
                          className={slug == "ppc" ? "active" : ""}
                          onClick={() => {
                            opennav();
                          }}
                          href="/tools/ppc"
                        >
                          Protection Calculator
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={slug == "riskcontribution" ? "active" : ""}
                          onClick={() => {
                            opennav();
                          }}
                          href="/tools/riskcontribution"
                        >
                          Risk Contribution
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={slug == "factor_analysis" ? "active" : ""}
                          onClick={() => {
                            opennav();
                          }}
                          href="/tools/factor_analysis"
                        >
                          Factor Analysis
                        </Link>
                      </li>
                      {/* <li><Link className={slug == "mc" ? 'active' : ""} onClick={() => { opennav(); }} href="/tools/mc">Forward Test</Link></li> */}
                      <li>
                        <Link
                          className={slug == "rw" ? "active" : ""}
                          onClick={() => {
                            opennav();
                          }}
                          href="/tools/rw"
                        >
                          Risk Weather
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li><Link className={isActive('/tools/enterprise_api')} href="/tools/enterprise_api" onClick={() => { opennav(); }}>Enterprise API</Link></li> */}
                  <li>
                    <Link
                      className={isActive("/Pricing")}
                      href="/Pricing"
                      onClick={() => {
                        opennav();
                      }}
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={isActive("/webinars")}
                      onClick={() => {
                        opennav();
                      }}
                      href={`/webinars`}
                    >
                      Webinars
                    </Link>
                  </li>
                  <li>
                    <Link className={isActive("/About")} href="javascript:;">
                      Company
                    </Link>
                    <ul className="submenu">
                      <li>
                        <Link
                          className={slug == "about-adaptive" ? "active" : ""}
                          href="/company/about-adaptive"
                          onClick={() => {
                            opennav();
                          }}
                        >
                          About Adaptive
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={isActive("/faq")}
                          onClick={() => {
                            opennav();
                          }}
                          href={`/company/faq`}
                        >
                          Resources
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={isActive("/blog")}
                          onClick={() => {
                            opennav();
                          }}
                          href={"/company/blog"}
                        >
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                      <Link className={isActive('/About')} href="javascript:;">Company</Link>
                      <ul className="submenu">
                        <li><Link className={isActive(process.env.NEXT_PUBLIC_WEBSITE_URL + 'faq/')} onClick={() => { opennav(); }} href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}faq/`}>Resources</Link></li>
                        <li><Link className={isActive(process.env.NEXT_PUBLIC_WEBSITE_URL + 'thought-leadership/')} onClick={() => { opennav(); }} href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}thought-leadership/`}>Thought Leadership</Link></li>
                      </ul>
                    </li> */}
                  <li className="navbutton">
                    {/* <Link
                        href="/demo/requestdemo"
                        rel="noopener noreferrer"
                        className="button secondary"
                        onClick={() => { opennav(); }}
                      >
                        Request a Demo
                      </Link> */}
                    <Link className="button" href={`https://app2.adaptive-investments.com/`}>
                      Launch App
                    </Link>
                    <Link
                      className="button secondary"
                      href={`/Pricing`}
                      // href={`${url2}/advisorsignup`}
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navbar;
