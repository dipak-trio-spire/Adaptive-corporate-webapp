import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AdvisorsWealthManagers from '@/pages/what-we-serve/[slug]/AdvisorsWealthManagers';
import RetailInvestors from '@/pages/what-we-serve/[slug]/RetailInvestors';
import Enterprises from '@/pages/what-we-serve/[slug]/Enterprises';

export default function WhatWeServePage() { // Renamed from index to WhatWeServePage
  const router = useRouter();
  const slug = router.query.slug;
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (slug === 'retail-investors') {
      setCurrentPage(<RetailInvestors />);
    } else if (slug === 'enterprises') {
      setCurrentPage(<Enterprises />);
    } else {
      setCurrentPage(<AdvisorsWealthManagers />);
    }
  }, [slug]);

  return (
    <>
      {currentPage}
    </>
  );
}
