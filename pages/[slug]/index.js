import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Whatwedo from '@/pages/[slug]/What-we-do';
import Pricing from '@/pages/[slug]/pricing';
import Webinars from '@/pages/[slug]/Webinars';
import Faq from '@/pages/company/[slug]/Faq';
import Blog from '@/pages/company/[slug]/Blog';

export default function WhatWeServePage() { // Renamed from index to WhatWeServePage
  const router = useRouter();
  const slug = router.query.slug;
  const [currentPage, setCurrentPage] = useState(null);
  

  useEffect(() => {
    if (slug === 'what-we-do') {
      setCurrentPage(<Whatwedo />);
    }
    else if (slug === 'webinars') {
      setCurrentPage(<Webinars />);
    } else if(slug === 'faq') {
      setCurrentPage(<Faq />);
    }else if(slug === 'thought-leadership') {
      setCurrentPage(<Blog />);
    }else {
      setCurrentPage(<Pricing />);
    }
  }, [slug]);

  return (
    <>
      {currentPage}
    </>
  );
}
