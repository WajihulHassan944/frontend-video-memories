import './cookies.css';

export default function CookiesPolicy() {
  return (
    <div className="cookies-container">
      <img
        src="/logo.png"
        alt="Video Memories Logo"
        className="cookies-logo"
      />
      <h1 className="cookies-title">Cookies Policy – VideoMemories.eu</h1>

      <div className="cookies-content">
        <p><strong>Last updated:</strong> October 6, 2025</p>

        <p>
          This Cookies Policy explains how <strong>VideoMemories.eu</strong> (“we”, “us”, or “our”) uses cookies and similar technologies on our website, applications, and services (collectively, the “Service”).
        </p>

        <p>
          By continuing to use our Service, you consent to the use of cookies in accordance with this policy—unless you have disabled them via your browser settings or our cookie preference tool.
        </p>

        <h3>What Are Cookies?</h3>
        <p>
          Cookies are small text files placed on your device (computer, smartphone, etc.) when you visit a website. They are widely used to make websites work, improve user experience, enable secure transactions, and provide usage insights.
        </p>

        <h3>Types of Cookies We Use</h3>

        <h4>1. Essential Cookies</h4>
        <p>
          These cookies are required for the website to function properly. Examples include:
        </p>
        <ul>
          <li>Session management (login, account access, video uploads)</li>
          <li>Security (fraud prevention, CSRF protection)</li>
          <li>Payment provider cookies (Stripe) to process secure credit purchases</li>
          <li>Cloudflare cookies (for network performance and DDoS protection)</li>
        </ul>
        <p>These cannot be disabled as they are necessary for the Service.</p>

        <h4>2. Performance Cookies</h4>
        <p>
          These collect aggregated, anonymous data about how visitors use our website (e.g., which pages are visited most often), helping us improve performance and functionality.
        </p>

        <h4>3. Preference Cookies</h4>
        <p>
          These remember your personal settings, such as selected language, so we can personalize your experience.
        </p>

        <h4>4. Advertising & Tracking Cookies (if applicable)</h4>
        <p>
          If you consent, we or third parties (e.g., Google Ads, Meta/Facebook Pixel, LinkedIn Ads) may set cookies to deliver personalized ads, track campaigns, and measure ad effectiveness. These are only activated if you explicitly accept them.
        </p>

        <h4>5. Third-Party Cookies</h4>
        <p>
          We may allow third-party services—such as analytics providers (e.g., Google Analytics, Plausible, or similar), payment providers, or social media plugins—to place cookies. These services have their own privacy and cookie policies.
        </p>

        <h3>Managing Your Cookie Preferences</h3>
        <p>You can manage or withdraw your consent for non-essential cookies at any time via:</p>
        <ul>
          <li>Our Cookie Settings banner/tool (shown on first visit and accessible via the footer)</li>
          <li>Your browser settings (to block or delete cookies manually)</li>
        </ul>
        <p>
          Please note: Disabling certain cookies may impact your user experience or prevent secure transactions.
        </p>

        <h3>Updates to This Policy</h3>
        <p>
          We may update this Cookies Policy from time to time. If we make material changes, we will notify you by updating the date above and, where appropriate, provide additional notice (e.g., via a pop-up banner).
        </p>

        <h3>Contact</h3>
        <p>
          If you have any questions or concerns about this Cookies Policy, please contact us at:{" "}
          <a href="mailto:info@videomemories.eu">info@videomemories.eu</a>
        </p>
      </div>
    </div>
  );
}
