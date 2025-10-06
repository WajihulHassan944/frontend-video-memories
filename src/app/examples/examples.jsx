import React from 'react'
import "./examples.css";
import HeroSection from '../home/page';
import EnhancementDemo from '../upload/EnhancementDemo/EnhancementDemo';
import StatsCounter from '../upload/CustomerTestimonials/StatsCounter';
import CtaSection from './CtaSection/CtaSection';
import Testimonial from './Testimonial/Testimonial';
import CustomerTransformations from './CustomerTransformations/CustomerTransformations';
const Examples = () => {
  return (
    <div className='examples-wrapper'>
      
<HeroSection 
  subtitle="Real Customer Examples"
  title={[
    { text: "Amazing", className: "outline" },
    { text: "Before &", className: "bold" },
    { text: "After Results", className: "gradient" },
  ]}
  description="See how our AI technology transforms old, damaged videos into stunning \n memories. Real customers, real results, absolutely incredible transformations."
  descColor="#ababba" 
/>  
<StatsCounter
  stats={[
    { target: 15000, suffix: '+', label: 'Videos Converted' },
    { start: 0.1, target: 4.9, decimals: 1, label: 'Average Rating', extra: '★' },
    { target: 99.8, suffix: '%', decimals: 1, label: 'Customer Satisfaction' },
  ]}
  containerColor="transparent"
  labelColor="#ccc"
  valueColor="#fa8938"
  border="none"
  marginTop="-100px"
    valueFontSize="1.875rem"
  labelFontSize=".875rem"
  marginBottom="70px"
/>
<EnhancementDemo />
<CustomerTransformations />
<Testimonial />
<CtaSection />
    </div>
  )
}

export default Examples
