import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AdaptiveShield from '@/pages/Product/[slug]/AdaptiveShield';
import CryptoShield from '@/pages/Product/[slug]/CryptoShield';
import BlackSwan from '@/pages/Product/[slug]/BlackSwan';
import AdaptiveIncome from '@/pages/Product/[slug]/AdaptiveIncome';

export default function ProductPage() {
  const router = useRouter();
  const slug = router.query.slug;
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (slug === 'adaptive-income') {
      setCurrentPage(<AdaptiveIncome />);
    } else if (slug === 'black-swan') {
      setCurrentPage(<BlackSwan />);
    } else if (slug === 'crypto-shield') {
      setCurrentPage(<CryptoShield />);
    } else {
      setCurrentPage(<AdaptiveShield />);
    }
  }, [slug]);

  return (
    <>
      {currentPage}
    </>
  );
}
