'use client';
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BillingMethods from './BillingMethods';
import "./TopupCredit.css";
const stripePromise = loadStripe("pk_test_51SEO9XH1NNpkUGNq59gQ0BD0TruMhI6Jv1mJWalWczLEwvbncESJfRelyazAvyJcChGipUaUka93jxKykkQm1IfM00EHDtM9mE");
import { baseUrl } from '@/const';
import withAuth from '@/hooks/withAuth';
const AddBilling = () => {
    const [clientSecret, setClientSecret] = useState('');
  
    useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch(`${baseUrl}/wallet/create-setup-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // if using cookies/auth
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);
  
 const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <BillingMethods />
        </Elements>
      )}
    </>
  );
};

export default withAuth(AddBilling);
