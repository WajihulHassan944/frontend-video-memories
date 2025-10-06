'use client';

import React from 'react';
import './price.css';
import PricingSectionInPricing from './PricingSection/PricingSection';
import { useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions/PaymentOptions';
import HeroSection from '../home/page';

const Pricing = () => {
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
  <center> <div className="pricing-container">
     
<HeroSection 
  subtitle="Video Enhancement Credits"
  title={[
    { text: "Simple,", className: "outline" },
    { text: "transparent", className: "bold" },
    { text: "pricing", className: "gradient" },
  ]}
  description="Pay per credit, use when you need. No subscriptions, no hidden fees."
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
