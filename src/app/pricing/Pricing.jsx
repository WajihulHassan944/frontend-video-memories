'use client';

import React from 'react';
import './price.css';
import PricingSectionInPricing from './PricingSection/PricingSection';
import { useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions/PaymentOptions';
import HeroSection from '../home/page';
import { parseDynamicTitle } from '@/utils/parseTitle';

const Pricing = ({ section }) => {
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

   const parsedTitle = parseDynamicTitle(section?.description);

  return (
  <center> <div className="pricing-container">
 <HeroSection
  subtitle={section?.title}
  title={parsedTitle}
  description={section?.subDescription}
  descColor="#ababba"
/>
     {!isLoggedIn &&  <div className="free-minute-pricing">🎁 Get 1 minute of free conversion after registration</div>}
      
      
      <PricingSectionInPricing />
<PaymentOptions />




    </div>
  </center> 
   );
};

export default Pricing;
