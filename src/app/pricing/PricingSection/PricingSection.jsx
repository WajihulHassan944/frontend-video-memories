'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import './PricingSection.css';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useCurrencyByUserCountry } from '@/utils/getCurrencySymbolByCountry';
import { localizedPricing } from '@/utils/localizedPricing';

const PricingSectionInPricing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const [loadingAmount, setLoadingAmount] = useState(null);
const [hoveredIndex, setHoveredIndex] = useState(null);
  // ✅ Get currency directly from reusable hook
  const { code: currencyCode, symbol: currencySymbol } = useCurrencyByUserCountry();

  // Build plans dynamically
  const plans = [15, 50, 120].map((credits) => {
    const price =
      localizedPricing[currencyCode]?.[credits] ??
      localizedPricing['EUR'][credits];

    return {
      credits,
      price: `${currencySymbol} ${Math.round(price)}`,
      rate: credits === 15
          ? 'Good to explore'
          : credits === 50
          ? 'Best value per minute'
          : 'Lowest cost per minute',
      name:
        credits === 15
          ? 'Basic Plan'
          : credits === 50
          ? 'Standard Plan'
          : 'Pro Plan',
      features:
        credits === 15
          ? ['Up to 1080p enhancement', 'AI noise reduction', 'Color enhancement']
          : credits === 50
          ? [
              'Up to 4K enhancement',
              'AI upscaling & denoising',
              'Advanced color grading',
              'Commercial license'
            ]
          : [
              'Up to 8K enhancement',
              'AI upscaling & denoising',
              'Advanced color grading',
              'Batch processing',
              'Priority rendering',
              'Commercial license'
            ],
      popular: credits === 50,
    };
  });

  const handleBuyCredits = async (credits) => {
    if (!localizedPricing[currencyCode] || localizedPricing[currencyCode][credits] === undefined) {
      toast.error('Please wait, calculating local pricing...');
      return;
    }

    setLoadingAmount(credits);
    const amount = Math.round(localizedPricing[currencyCode][credits]);

    try {
      const res = await fetch(`${baseUrl}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credits, amount }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Credits added to cart!');
        router.push('/cart');
        await refreshAndDispatchUser(dispatch);
      } else {
        toast.error(data.error || 'Failed to add credits');
      }
    } catch (err) {
      console.error('❌ Error adding credits:', err);
      toast.error('Something went wrong');
    } finally {
      setLoadingAmount(null);
    }
  };

  const handleClick = (credits) => {
    if (isLoggedIn) {
      handleBuyCredits(credits);
    } else {
      localStorage.setItem('pendingCredits', credits);
      router.push('/login');
    }
  };

  return (
    <>
<div className="creditTableWrapper">
  <div className="credit-table">
    <h3 className="credit-heading">Credit Usage per Enhancement</h3>

    <div className="credit-header">
      <span className="feature-col">Enhancement Feature</span>
      <span className="col">720p–1080p</span>
      <span className="col">4K</span>
    </div>

    <div className="credit-row">
      <span className="feature-col">Video Denoising</span>
      <span className="credit">2 credits/min</span>
      <span className="credit">6 credits/min</span>
    </div>

    <div className="credit-row">
      <span className="feature-col">Face Enhancement</span>
      <span className="credit">3 credits/min</span>
      <span className="credit">8 credits/min</span>
    </div>

    <div className="credit-row">
      <span className="feature-col">Color Enhancement</span>
      <span className="credit">2 credits/min</span>
      <span className="credit">5 credits/min</span>
    </div>

    <div className="credit-row">
      <span className="feature-col">SDR → HDR Conversion</span>
      <span className="credit">4 credits/min</span>
      <span className="credit">10 credits/min</span>
    </div>

    <div className="credit-row">
      <span className="feature-col">Video Upscaling (2x–4x)</span>
      <span className="credit">5 credits/min</span>
      <span className="credit">15 credits/min</span>
    </div>

    <div className="credit-footer">
      Multiple enhancements can be combined. Credit cost is additive per feature used.
    </div>

    <div className="credit-note">
      ✓ Credits valid for 1 year from purchase date
    </div>
  </div>
</div>


      <h1 className="buy-credit-title">Buy your enhancement credits</h1>
      <div className="pricing-card-wrapper">
        {plans.map((plan, index) => (
          <div
  key={index}
  className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
  onClick={() => handleClick(plan.credits)}
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    cursor: loadingAmount === plan.credits ? 'default' : 'pointer',
    pointerEvents: loadingAmount === plan.credits ? 'none' : 'auto',
  }}
>

{/* {index === 2 && (
  <div className="pricing-card-ribbon">
    <span>Best Value</span>
  </div>
)} */}


            {plan.popular && <div className="pricing-card-label">Most Popular</div>}
            <h3 className="pricing-card-credits">{plan.credits} credits</h3>
            <p className="pricing-card-price">{plan.price}</p>
            <p className="pricing-card-rate">{plan.rate}</p>
            <h4 className="pricing-card-name">{plan.name}</h4>
            {/* <h5>One-time purchase</h5> */}
            <ul className="pricing-feature-list">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <FaCheck className="pricing-feature-icon" /> {feature}
                </li>
              ))}
            </ul>
            <div className="pricing-button-container">
              <button
  className={`pricing-get-started-btn ${
    hoveredIndex !== null && hoveredIndex !== index ? 'button-dull' : ''
  }`}
  disabled={loadingAmount === plan.credits}
>
  {loadingAmount === plan.credits ? 'Processing...' : 'Get Started'}
</button>
            </div>
            <p className="credit-valid-para">Credits valid for 1 year</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PricingSectionInPricing;
