import React from 'react'

const CreditUsagePerMinute = () => {
  return (
   
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

  )
}

export default CreditUsagePerMinute
