'use client';
import React, { useEffect, useState } from 'react';
import { fetchCart } from '@/utils/cart/fetchCart';
import { handleDelete } from '@/utils/cart/handleDelete';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { FaArrowLeft } from 'react-icons/fa';
countries.registerLocale(enLocale);
const countryOptions = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  value: code,
  label: name,
}));

import './cart.css';
import { FaTrashAlt, FaVrCardboard } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';
import { useCurrencyByUserCountry} from '@/utils/getCurrencySymbolByCountry';
import { handleBuyCredits } from '@/utils/cart/handleBuyCredits';
import ShoppingCart from './cart';
import { handleCheckout } from '@/utils/cart/handleCheckout';
import CouponInput from './CouponInput/CouponInput';

const stripePromise = loadStripe(
  'pk_test_51SEO9XH1NNpkUGNq59gQ0BD0TruMhI6Jv1mJWalWczLEwvbncESJfRelyazAvyJcChGipUaUka93jxKykkQm1IfM00EHDtM9mE'
);
const CartPage = () => {

const currency = useCurrencyByUserCountry(); // ✅ get currency
const currencySymbol = currency.symbol;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(false);
const [checkoutLoading, setCheckoutLoading] = useState(false);
const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
const [couponData, setCouponData] = useState(null);
const [couponMessage, setCouponMessage] = useState(null); 
const [billingData, setBillingData] = useState({
  name:'',
  street: '',
  postalCode: '',
  city: '',
  country: '',
  companyName: '',
  vatNumber: ''
});


const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); 
const [page, setPage] = useState(1);
const [stripeRedirectSuccess, setStripeRedirectSuccess] = useState(null);

const searchParams = useSearchParams();



useEffect(() => {
  const redirectStatus = searchParams.get('redirect_status');

  if (redirectStatus === 'succeeded') {
    setStripeRedirectSuccess(true);
    setPage(3);
  } else if (redirectStatus === 'failed') {
    setStripeRedirectSuccess(false);
    toast.error('Payment method setup failed.');
  }

}, [searchParams]);




useEffect(() => {
  if (user?.invoices?.length) {
    // Find the first invoice that actually has billingInfo
    const invoiceWithBilling = user.invoices.find(
      (inv) => inv.billingInfo && Object.keys(inv.billingInfo).length > 0
    );

    if (invoiceWithBilling) {
      const info = invoiceWithBilling.billingInfo;

      // Match the country for dropdown (still using user.country)
      const matched = countryOptions.find(
        (opt) => opt.label === user.country || opt.value === user.country
      );

      setBillingData({
        name: info.name || '',
        street: info.street || '',
        postalCode: info.postalCode || '',
        city: info.city || '',
        companyName: info.companyName || '',
        vatNumber: info.vatNumber || '',
        country: matched?.label || ''
      });
    }
  }
}, [user?.invoices, user?.country]);

const [vatPercent, setVatPercent] = useState(null);
const [finalPrice, setFinalPrice] = useState(0);
const [vatNote, setVatNote] = useState('');

const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkVAT = async () => {
  console.log("vat called");
  const { vatNumber, country } = billingData;
  if (!country) return;
  console.log(country);

  try {
    const res = await fetch(`${baseUrl}/wallet/checkVat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vatNumber, country }),
    });

    const data = await res.json();
    if (data.success) {
      // ✅ Always start with cart base total
      const baseTotal = credits.reduce((sum, c) => sum + c.amount, 0);

      // ✅ Read discount info from localStorage
      const storedDiscount = parseFloat(localStorage.getItem("discountAmount")) || 0;
      const discountedTotal = Math.max(baseTotal - storedDiscount, 0);

      // ✅ VAT on discounted total (instead of raw cart)
      const vatAmount = discountedTotal * data.vatRate;
      const final = discountedTotal + vatAmount;

      // update VAT UI
      setVatNote(data.vatNote || "");
      setVatPercent(data.vatRate * 100);

      // ✅ keep original subtotal as reference
      setPriceBeforeDiscount(baseTotal);

      // ✅ final price = discountedTotal + VAT
      setFinalPrice(final);

      console.log("Applied VAT with discount logic:", {
        baseTotal,
        storedDiscount,
        discountedTotal,
        vatRate: data.vatRate,
        vatAmount,
        final,
      });
    }
  } catch (err) {
    console.error("VAT check error:", err);
  }
};


  useEffect(() => {  
  checkVAT();
}, [billingData.country, billingData.vatNumber, credits]);



const isBillingComplete = billingData.name &&
  billingData.country &&
  billingData.street &&
  billingData.postalCode;
  useEffect(() => {
        if (!currency?.code || !currency?.symbol) {
        return;
    }
    const pendingCredits = localStorage.getItem('pendingCredits');

    if (pendingCredits) {
      localStorage.removeItem('pendingCredits');
      handleBuyCredits(
        pendingCredits,
        dispatch,
        fetchCart,
        setLoading,
        setCredits,
        currency // ✅ use it here
      );
    } else {
      fetchCart(setCredits, setLoading, currency); // ✅ use it here
    }
  }, [currency]);


const fetchClientSecret = async () => {
  try {
    setLoadingPaymentIntent(true); // start spinner

    // 🌍 Detect country on frontend
    const geoRes = await fetch(`https://ipwho.is/`);
    const geoData = await geoRes.json();
    const userCountry = geoData?.country_code || 'NL';

    const res = await fetch(`${baseUrl}/wallet/create-payment-intent-all-methods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        amount: finalPrice,
        countryCode: userCountry, // send detected country
        currencyCode:currency.code,
      }),
    });

    const data = await res.json();
    if (data?.clientSecret) {
      setClientSecret(data.clientSecret);
      setPaymentMethods(data.paymentMethods || []);
      localStorage.removeItem("paymentIntentId");
      localStorage.setItem("paymentIntentId", data.paymentIntentId);
    }
  } catch (error) {
    console.error('❌ Error fetching client secret:', error);
  } finally {
    setLoadingPaymentIntent(false); // stop spinner
  }
};


 useEffect(() => {
      if (page === 2 && finalPrice > 0) {
        fetchClientSecret();
      }
  }, [page, finalPrice]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
    // ✅ Hide name, email, and address fields
    fields: {
      billingDetails: {
        name: 'never',
        email: 'never',
        address: 'never',
      },
    },
  };

const handleCouponValidate = (coupon) => {
  console.log("Valid coupon data:", coupon);
  setCouponData(coupon);

  if (!coupon) {
    setFinalPrice(priceBeforeDiscount);
    // ❌ clear old values if no coupon
    localStorage.removeItem("couponData");
    localStorage.removeItem("priceBeforeDiscount");
    localStorage.removeItem("discountAmount");
    return;
  }

  let discountedPrice = priceBeforeDiscount;
  let discountAmount = 0;
  let message = { type: "success", text: "Coupon applied successfully 🎉" };

  switch (coupon.type) {
    case "percentage": {
      discountAmount = (priceBeforeDiscount * coupon.amount) / 100;
      discountedPrice -= discountAmount;
      break;
    }

    case "fixed_cart": {
      if (coupon.cartMinItems && credits.length >= coupon.cartMinItems) {
        discountAmount = (priceBeforeDiscount * coupon.amount) / 100;
        discountedPrice -= discountAmount;
      } else {
        message = {
          type: "error",
          text: `This coupon requires at least ${coupon.cartMinItems} items in your cart.`,
        };
      }
      break;
    }

    case "fixed_product": {
      if (coupon.productRestriction?.length) {
        const eligible = credits.some((c) =>
          coupon.productRestriction.includes(Number(c.credits))
        );
        if (eligible) {
          discountAmount = (priceBeforeDiscount * coupon.amount) / 100;
          discountedPrice -= discountAmount;
        } else {
          message = {
            type: "error",
            text: `You need to purchase either Basic, Standard, or Premium (${coupon.productRestriction.join(
              ", "
            )} credits) to use this coupon.`,
          };
        }
      }
      break;
    }

    default:
      message = { type: "error", text: "Unknown coupon type." };
  }

  setCouponMessage(message);
  setFinalPrice(Math.max(discountedPrice, 0));

  // ✅ Save to localStorage
  localStorage.setItem("couponData", JSON.stringify(coupon));
  localStorage.setItem("priceBeforeDiscount", priceBeforeDiscount);
  localStorage.setItem("discountAmount", discountAmount);
  checkVAT();
};
  return (
    <div className="cart-container-page">
     <h2 className="cart-title">Shopping Cart</h2>
      {loading ? (
        <p className="loading-cart">Loading cart...</p>
      ) : credits.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        credits.map((credit, index) => (
          <div key={credit._id || index} className="cart-item">
            <div className="item-icon">
              <FaVrCardboard size={24} color="#fff" />
            </div>
            <div className="item-info">
             <strong>{credit.credits} credits for {currencySymbol} {credit.amount}</strong>
<span>Video Restoration</span>

            </div>
            <button className="delete-btn"  onClick={() => handleDelete(index, dispatch, setCredits)}>
              <FaTrashAlt color="#fff" />
            </button>
          </div>
        ))
      )}
      
{credits.length > 0 && ( <>
{page === 1 ? (


  <>
     <div className="billing-form">
    <h3 className="billing-title">Billing Information</h3>
<input
      type="text"
      placeholder="Name"
      value={billingData.name}
      onChange={(e) => setBillingData({ ...billingData, name: e.target.value })}
    />
<input
      type="text"
      placeholder="Company Name (Optional)"
      value={billingData.companyName}
      onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
    />
    
    <input
      type="text"
      placeholder="Street Address"
      value={billingData.street}
      onChange={(e) => setBillingData({ ...billingData, street: e.target.value })}
    />
    <input
      type="text"
      placeholder="Postal Code"
      value={billingData.postalCode}
      onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
    />
    {/* <input
      type="text"
      placeholder="City"
      value={billingData.city}
      onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
    /> */}
<Select
  options={countryOptions}
  value={countryOptions.find((opt) => opt.label === billingData.country)}
  onChange={(selected) => {
    setBillingData((prev) => ({
      ...prev,
      country: selected?.label || ''
    }));
  }}
  placeholder="Select Country"
  className="country-select"
  classNamePrefix="select"
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'left',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
      textAlign: 'left',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
      color: 'black',
      textAlign: 'left',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray',
      textAlign: 'left',
    }),
  }}
/>

    <input
      type="text"
      placeholder="VAT Number (Optional)"
      value={billingData.vatNumber}
      onChange={(e) => setBillingData({ ...billingData, vatNumber: e.target.value })}
    />
<CouponInput onValidate={handleCouponValidate} />
{couponMessage && (
  <p
    className={
      couponMessage.type === "error"
        ? "coupon-msg error"
        : "coupon-msg success"
    }
  >
    {couponMessage.text}
  </p>
)}

  </div>

{credits.length > 0 && (
  <>
    <div className="final-price-box">
      <p className="subtotal-line">
  <span className='colored'>Subtotal:</span>  {currencySymbol} {credits.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}
</p>
{vatPercent !== null && (
  <p className="vat-total-line">
    Total incl. <span>VAT ({vatPercent}%):</span>{" "}
    {Number(localStorage.getItem("discountAmount") || 0) > 0 ? (
      <>
        <span className="old-price">
          {currencySymbol} {(priceBeforeDiscount * (1 + vatPercent / 100)).toFixed(2)}
        </span>{" "}
        <span className="discounted-price">
          {currencySymbol} {finalPrice.toFixed(2)}
        </span>
      </>
    ) : (
      <span>
        {currencySymbol} {finalPrice.toFixed(2)}
      </span>
    )}
  </p>
)}


    </div>
  </>
)}



{vatNote && <p className="vat-note">{vatNote}</p>}

      {!loading && credits.length > 0 && (
<button
  className="checkout-btn"
  onClick={() => {
    // Save billing data to local storage
    localStorage.setItem('billingData', JSON.stringify(billingData));

    setPage(2);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }}
  disabled={!isBillingComplete}
>
  Proceed to checkout
</button>


      )}

  </>
)  : page === 2 ? (
   <>
    {loadingPaymentIntent ? (
      <div className="spinner-cart" /> 
    ) : clientSecret && isBillingComplete ? (
      <Elements stripe={stripePromise} options={options}>
        <ShoppingCart
          availableMethods={paymentMethods}
          billingData={billingData}
          setPage={setPage}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      </Elements>
    ) : null}
  </>

) : page === 3 ? (
 <div className="billing-form">
 {stripeRedirectSuccess === false && (
  <div className='backArrowIconWrap'>
    <FaArrowLeft
    onClick={() => setPage(1)}
    className="backArrowIcon"
  />
  </div>
 )}
  <h3 className="billing-title">Payment</h3>
  
{selectedPaymentMethod === "card" && (
  <p className="stripe-message success">Payment method primary card selected. You can now confirm.</p>
)}
{stripeRedirectSuccess === true && (
  <p className="stripe-message success">Payment method setup succeeded. You can now confirm.</p>
)}

{stripeRedirectSuccess === false && (
  <p className="stripe-message error">Payment method setup failed. Please try again.</p>
)}

{!loading && (
<button
  className="checkout-btn"
  onClick={() =>
    handleCheckout({
      user,
      credits,
      billingData,
      currencySymbol,
      selectedPaymentMethod,
      router,
      dispatch,
      setCheckoutLoading
    })
  }
  disabled={stripeRedirectSuccess === false}
>
  {checkoutLoading ? (
    <div className="spinner-cart" />
  ) : (
    'Proceed'
  )}
</button>
   )}

 </div>

) : null}


      </>
      )}
    </div>
  );
}
export default CartPage;