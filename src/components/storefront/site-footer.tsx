import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Link to="/" className="site-footer__brand">mokobara</Link>
        <p>Good things go places.</p>
        <a href="/#best-sellers" className="site-footer__back-to-shop">
          Back to best sellers <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="site-footer__bottom">
        <span>Travel well. Move easy.</span>
        <span>© Mokobara</span>
      </div>
    </footer>
  );
}