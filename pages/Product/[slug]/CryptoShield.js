import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ComingSoon from "@/components/ComingSoon/ComingSoon"
import { AllData } from "@/utils/fetchHelpers";
import PageLoader from '@/components/PageLoader/PageLoader';

export default function CryptoShield() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [comingSoonData, setComingSoonData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  useEffect(() => {
    if (!slug) {
      console.warn("No 'home' slug parameter found.");
      setComingSoonData(null); 
      return;
    }
    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== 'no_page') {
          setComingSoonData(initialContent);
        } else {
          setComingSoonData(null);   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setComingSoonData(null); 
      }finally {
        setLoading(false); // Stop loader after fetching is complete
      }
    };
  
    fetchData();
  }, [slug]);

  return (
    <>
    {
      loading && <PageLoader/>
    }
    <ComingSoon ComingSoon={comingSoonData}></ComingSoon>
    </>
  );
}
