import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AboutAdaptive from '@/pages/company/[slug]/AboutAdaptive';
import Blog from '@/pages/company/[slug]/Blog';
import Faq from '@/pages/company/[slug]/Faq';

export default function WhatWeServePage() { // Renamed from index to WhatWeServePage
  const router = useRouter();
  const slug = router.query.slug;
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (slug === 'about-adaptive') {
      setCurrentPage(<AboutAdaptive />);
    }else if (slug === 'faq') {
      setCurrentPage(<Faq />);
    } else {
      setCurrentPage(<Blog />);
    }
  }, [slug]);

  return (
    <>
      {currentPage}
    </>
  );
}
