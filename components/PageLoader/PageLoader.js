import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PageLoader(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && (
        (props.hostname === 'halo' ? (
          <div className="page-loader">
            <svg width="127" className='loadersvghalo' height="35" viewBox="0 0 127 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_12319_13844)">
                <g clip-path="url(#clip1_12319_13844)">
                  <path d="M5.9091 12.4313V20.4488H13.0555V12.4313H18.9724V34.955H13.0555V26.3659H5.9091V34.955H-0.0078125V12.4313H5.9091Z" fill="#081A66" />
                  <path d="M44.227 27.0259H48.8218L46.5394 22.0716L44.227 27.0259ZM34.6474 34.955L45.1572 12.4313H47.8312L58.4318 34.955H52.515L51.1349 32.0105H41.9141L40.562 34.955H34.6474Z" fill="#081A66" />
                  <path d="M74.0903 12.4313H80.0055V29.0077H88.1136V34.955H74.0903V12.4313Z" fill="#081A66" />
                  <path d="M114.738 20.5763C113.03 20.5763 111.638 21.969 111.638 23.6919C111.638 25.3977 113.03 26.8093 114.738 26.8093C116.46 26.8093 117.853 25.3977 117.853 23.6919C117.853 21.969 116.46 20.5763 114.738 20.5763ZM114.729 12.4313C120.947 12.4313 125.992 17.5067 125.992 23.722C125.992 29.9384 120.947 34.955 114.729 34.955C108.514 34.955 103.499 29.9384 103.499 23.722C103.499 17.5067 108.514 12.4313 114.729 12.4313Z" fill="#081A66" />
                  <path d="M114.738 0.0742188C113.03 0.0742188 111.638 1.46857 111.638 3.19162C111.638 4.89751 113.03 6.30698 114.738 6.30698C116.46 6.30698 117.853 4.89751 117.853 3.19162C117.853 1.46856 116.46 0.0742188 114.738 0.0742188Z" fill="#081A66" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_12319_13844">
                  <rect width="126.031" height="35" fill="white" />
                </clipPath>
                <clipPath id="clip1_12319_13844">
                  <rect width="126.031" height="35" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <i className="loaderhalo"></i>
          </div>
        ) : (
          <div className="page-loader">
            <svg className='loadersvg' width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.15508 4.69017C4.92348 1.64368 8.34583 0.0551557 12.5311 0.229241C13.5339 0.272762 14.5802 0.381565 15.5175 0.707975C17.8063 1.49136 18.9617 3.36277 18.9835 6.06109C19.0053 9.49927 18.9835 12.9592 18.9835 16.3974C18.9835 19.0087 19.7682 19.6397 22.3186 19.0522C21.8391 20.8148 20.0516 22.338 18.0025 22.5992C15.3867 22.9256 13.1197 22.4468 12.1388 19.3568C11.681 19.8573 11.3322 20.2055 10.9834 20.5537C9.19597 22.4033 6.99433 23.0126 4.50931 22.5992C2.80903 22.3163 1.63192 21.3806 1.17415 19.705C0.650987 17.8118 1.26134 16.1798 2.56925 14.8306C4.33492 12.981 6.71095 12.1976 9.06518 11.436C9.82812 11.1966 10.6347 11.1096 11.3758 10.8267C11.681 10.7179 12.0298 10.2827 12.0734 9.95624C12.1824 9.23814 12.1388 8.49828 12.0952 7.78018C11.9862 5.21243 10.7873 3.90679 8.21504 3.97207C6.23138 4.01559 4.22593 4.42904 2.15508 4.69017ZM12.0952 11.6101C9.98071 11.6101 7.64828 13.3291 7.16871 15.1353C6.86354 16.3103 6.88534 17.4637 7.82267 18.3776C8.84719 19.3568 10.0897 19.4221 11.3758 18.9651C11.681 18.8563 12.0734 18.4429 12.0734 18.16C12.117 16.0057 12.0952 13.8296 12.0952 11.6101Z" fill="#60034C" />
            </svg>
            <i className="loader"></i>
          </div>
        )
        )
      )}
      {props.bdopen &&
        (props.hostname === 'halo' ? (
          <div className="page-loader">
            <svg width="127" className='loadersvghalo' height="35" viewBox="0 0 127 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_12319_13844)">
                <g clip-path="url(#clip1_12319_13844)">
                  <path d="M5.9091 12.4313V20.4488H13.0555V12.4313H18.9724V34.955H13.0555V26.3659H5.9091V34.955H-0.0078125V12.4313H5.9091Z" fill="#081A66" />
                  <path d="M44.227 27.0259H48.8218L46.5394 22.0716L44.227 27.0259ZM34.6474 34.955L45.1572 12.4313H47.8312L58.4318 34.955H52.515L51.1349 32.0105H41.9141L40.562 34.955H34.6474Z" fill="#081A66" />
                  <path d="M74.0903 12.4313H80.0055V29.0077H88.1136V34.955H74.0903V12.4313Z" fill="#081A66" />
                  <path d="M114.738 20.5763C113.03 20.5763 111.638 21.969 111.638 23.6919C111.638 25.3977 113.03 26.8093 114.738 26.8093C116.46 26.8093 117.853 25.3977 117.853 23.6919C117.853 21.969 116.46 20.5763 114.738 20.5763ZM114.729 12.4313C120.947 12.4313 125.992 17.5067 125.992 23.722C125.992 29.9384 120.947 34.955 114.729 34.955C108.514 34.955 103.499 29.9384 103.499 23.722C103.499 17.5067 108.514 12.4313 114.729 12.4313Z" fill="#081A66" />
                  <path d="M114.738 0.0742188C113.03 0.0742188 111.638 1.46857 111.638 3.19162C111.638 4.89751 113.03 6.30698 114.738 6.30698C116.46 6.30698 117.853 4.89751 117.853 3.19162C117.853 1.46856 116.46 0.0742188 114.738 0.0742188Z" fill="#081A66" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_12319_13844">
                  <rect width="126.031" height="35" fill="white" />
                </clipPath>
                <clipPath id="clip1_12319_13844">
                  <rect width="126.031" height="35" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <i className="loaderhalo"></i>
          </div>
        ) : (
          <div className="page-loader">
            <svg className='loadersvg' width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.15508 4.69017C4.92348 1.64368 8.34583 0.0551557 12.5311 0.229241C13.5339 0.272762 14.5802 0.381565 15.5175 0.707975C17.8063 1.49136 18.9617 3.36277 18.9835 6.06109C19.0053 9.49927 18.9835 12.9592 18.9835 16.3974C18.9835 19.0087 19.7682 19.6397 22.3186 19.0522C21.8391 20.8148 20.0516 22.338 18.0025 22.5992C15.3867 22.9256 13.1197 22.4468 12.1388 19.3568C11.681 19.8573 11.3322 20.2055 10.9834 20.5537C9.19597 22.4033 6.99433 23.0126 4.50931 22.5992C2.80903 22.3163 1.63192 21.3806 1.17415 19.705C0.650987 17.8118 1.26134 16.1798 2.56925 14.8306C4.33492 12.981 6.71095 12.1976 9.06518 11.436C9.82812 11.1966 10.6347 11.1096 11.3758 10.8267C11.681 10.7179 12.0298 10.2827 12.0734 9.95624C12.1824 9.23814 12.1388 8.49828 12.0952 7.78018C11.9862 5.21243 10.7873 3.90679 8.21504 3.97207C6.23138 4.01559 4.22593 4.42904 2.15508 4.69017ZM12.0952 11.6101C9.98071 11.6101 7.64828 13.3291 7.16871 15.1353C6.86354 16.3103 6.88534 17.4637 7.82267 18.3776C8.84719 19.3568 10.0897 19.4221 11.3758 18.9651C11.681 18.8563 12.0734 18.4429 12.0734 18.16C12.117 16.0057 12.0952 13.8296 12.0952 11.6101Z" fill="#60034C" />
            </svg>
            <i className="loader"></i>
          </div>
        )
        )}
      <style jsx>{`
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
          flex-direction: column;
          row-gap: 32px;
        }
        .loadersvg{
          width:64px;
          height:64px;
        }
        .loadersvghalo{height:40px;width:130px;}
        .loader,.loaderhalo {
        display: block;
        position: relative;
        width: 50%;
        display: grid;
        place-items: center;
        }
        .loader::before,
        .loader::after,
        .loaderhalo::before,
        .loaderhalo::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        }
        .loader::before,.loaderhalo::before {
        height: 5px;
        width: 100px;
        background-color: #60034c;
        animation: loader-4 0.8s cubic-bezier(0, 0, 0.03, 0.9) infinite;
        }
        .loaderhalo::before {
          width: 130px;
          background-color: #081A66;
        }
        @keyframes loader-4 {
        0%, 44%, 88.1%, 100% {
          transform-origin: left;
        }
        
        0%, 100%, 88% {
          transform: scaleX(0);
        }
        
        44.1%, 88% {
          transform-origin: right;
        }
        
        33%, 44% {
          transform: scaleX(1);
        }
        }
        
      `}</style>
    </>
  );
};