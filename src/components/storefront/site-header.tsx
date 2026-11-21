import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { products } from "@/lib/storefront-data";

type SiteHeaderProps = {
  variant?: "standard" | "hero";
};

const navigation = [
  { label: "Luggage", href: "/#best-sellers" },
  { label: "Backpacks", href: "/#best-sellers" },
  { label: "Totes", href: "/#best-sellers" },
  { label: "Accessories", href: "/#best-sellers" },
];

function AnnouncementBar() {
  return (
    <div className="announcement-bar" aria-label="Black Friday sale">
      <div className="announcement-bar__track" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span className="announcement-bar__group" key={index}>
            <span>LIVE NOW</span>
            <span className="announcement-bar__dot">◆</span>
            <span>BLACK FRIDAY SALE · UP TO 60% OFF</span>
            <span className="announcement-bar__dot">◆</span>
          </span>
        ))}
      </div>
      <a className="announcement-bar__hit-area" href="/#best-sellers" aria-label="Shop the Black Friday sale" />
    </div>
  );
}

export function SiteHeader({ variant = "standard" }: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products.slice(0, 3);
    return products
      .filter((product) => `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(normalized))
      .slice(0, 5);
  }, [query]);

  const navItems = navigation.map((item) => (
    <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
      {item.label}
    </a>
  ));

  return (
    <header className={`site-header site-header--${variant}`}>
      <AnnouncementBar />
      {variant === "hero" ? (
        <div className="site-header__hero-panel">
          <Link to="/" className="site-header__brand" aria-label="Mokobara home">
            mokobara
          </Link>
          <nav className={`site-header__hero-links${menuOpen ? " is-open" : ""}`} aria-label="Shop categories">
            {navItems}
            <a href="/#best-sellers" onClick={() => setMenuOpen(false)}>Best sellers</a>
          </nav>
          <div className="site-header__hero-actions">
            <Button
              variant="ghost"
              size="sm"
              className="site-header__search-button"
              aria-label={searchOpen ? "Close search" : "Search products"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              {searchOpen ? <X aria-hidden="true" /> : <Search aria-hidden="true" />}
              <span>Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="site-header__menu-button"
              aria-label={menuOpen ? "Close categories" : "Open categories"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
      ) : (
        <div className="site-header__standard-row">
          <Link to="/" className="site-header__brand" aria-label="Mokobara home">
            mokobara
          </Link>
          <nav className={`site-header__standard-links${menuOpen ? " is-open" : ""}`} aria-label="Shop categories">
            {navItems}
            <a href="/#best-sellers" onClick={() => setMenuOpen(false)}>Best sellers</a>
          </nav>
          <div className="site-header__standard-actions">
            <Button
              variant="ghost"
              size="icon"
              aria-label={searchOpen ? "Close search" : "Search products"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              {searchOpen ? <X aria-hidden="true" /> : <Search aria-hidden="true" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="site-header__menu-button"
              aria-label={menuOpen ? "Close categories" : "Open categories"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
      )}
      {searchOpen && (
        <div className="site-search" role="region" aria-label="Search Mokobara products">
          <label htmlFor="product-search">Search products</label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try backpacks, luggage, totes…"
            autoFocus
          />
          <div className="site-search__results">
            {matches.length > 0 ? (
              matches.map((product) => (
                <Link
                  to="/products/$slug"
                  params={{ slug: product.slug }}
                  key={product.slug}
                  onClick={() => setSearchOpen(false)}
                >
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                </Link>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}