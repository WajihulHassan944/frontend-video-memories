'use client';

import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        {/* ─── Logo ─────────────────────────────────── */}
        <Link href="/" className="footer-logo" aria-label="Xclusive 3D Homepage">
          <Image
            src="/logo.png"
            alt="Xclusive 3D company logo"
            width={190}
            height={125}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* ─── Footer links ─────────────────────────── */}
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/termsandconditions">Terms &amp; Conditions</Link>
          <Link href="/privacypolicy">Privacy Policy</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      <div className="footer-copy">
        <p>
          © {new Date().getFullYear()} <strong>Video Memories</strong> — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
