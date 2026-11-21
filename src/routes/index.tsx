import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/product-card";
import { SiteFooter } from "@/components/storefront/site-footer";
import { SiteHeader } from "@/components/storefront/site-header";
import heroImage from "@/assets/home-hero.webp.asset.json";
import {
  categoryFilters,
  getProductBySlug,
  products,
  type CategoryFilter,
} from "@/lib/storefront-data";

const categoryTiles = [
  { label: "Luggage", slug: "the-transit-luggage-set-of-3" },
  { label: "Backpacks", slug: "the-transit-backpack" },
  { label: "Totes", slug: "the-skye-tote" },
  { label: "Accessories", slug: "the-packing-cubes-set-of-6" },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mokobara — Travel, made easy" },
      {
        name: "description",
        content: "Discover thoughtfully designed luggage, backpacks, totes, and travel accessories from Mokobara.",
      },
      { property: "og:title", content: "Mokobara — Travel, made easy" },
      {
        property: "og:description",
        content: "Discover thoughtfully designed luggage, backpacks, totes, and travel accessories from Mokobara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const visibleProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);

  return (
    <div className="storefront-page">
      <SiteHeader variant="hero" />
      <main>
        <section className="sale-hero" aria-label="Mokobara Black Friday sale">
          <img
            className="sale-hero__image"
            src={heroImage.url}
            alt="Mokobara Black Friday sale in a warehouse aisle"
            fetchPriority="high"
          />
          <h1 className="sr-only">Mokobara Black Friday Sale — up to 60% off</h1>
          <Link to="/" hash="best-sellers" className="sale-hero__shop-link">
            <span className="sr-only">Shop best sellers</span>
          </Link>
        </section>

        <section className="category-section" aria-labelledby="category-title">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Find your way</p>
              <h2 id="category-title">Made for the miles ahead.</h2>
            </div>
            <p className="section-heading__aside">Luggage that moves with you, and the little things that make every trip easier.</p>
          </div>
          <div className="category-grid">
            {categoryTiles.map((category) => {
              const product = getProductBySlug(category.slug);
              if (!product) return null;
              return (
                <a
                  className="category-tile"
                  href="#best-sellers"
                  key={category.label}
                  onClick={() => setActiveCategory(category.label)}
                >
                  <div className="category-tile__image-wrap">
                    <img src={product.image} alt="" loading="lazy" />
                    <span className="category-tile__arrow" aria-hidden="true"><ArrowUpRight /></span>
                  </div>
                  <span className="category-tile__label">{category.label}</span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="bestsellers-section" id="best-sellers" aria-labelledby="bestsellers-title">
          <div className="section-heading section-heading--bestsellers">
            <div>
              <p className="eyebrow">Bestsellers</p>
              <h2 id="bestsellers-title">Crowd favourites.</h2>
            </div>
            <Link to="/products/$slug" params={{ slug: products[0]?.slug ?? "the-transit-backpack" }} className="text-link">
              Start with a favourite <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="category-filter" role="group" aria-label="Filter products by category">
            {categoryFilters.map((category) => (
              <Button
                key={category}
                type="button"
                variant={activeCategory === category ? "default" : "ghost"}
                size="sm"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="product-grid" aria-live="polite">
            {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
          {visibleProducts.length === 0 && <p className="empty-products">No products in this collection yet.</p>}
        </section>

        <section className="toggle-story" aria-labelledby="toggle-title">
          <div className="toggle-story__copy">
            <p className="eyebrow">The Toggle Series</p>
            <h2 id="toggle-title">Carry your own kind of day.</h2>
            <p>Backpacks designed for the work-from-anywhere movement.</p>
            <Button asChild variant="secondary">
              <Link to="/products/$slug" params={{ slug: "teleporter-toggle-backpack" }}>
                Explore the series <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <Link
            className="toggle-story__image-link"
            to="/products/$slug"
            params={{ slug: "teleporter-toggle-backpack" }}
            aria-label="Explore the Teleporter Toggle Backpack"
          >
            <img src={getProductBySlug("teleporter-toggle-backpack")?.image} alt="Teleporter Toggle Backpack" loading="lazy" />
            <span className="toggle-story__image-arrow" aria-hidden="true"><ArrowUpRight /></span>
          </Link>
        </section>

        <section className="closing-note" aria-label="Mokobara travel essentials">
          <p>Good things go places.</p>
          <Link to="/#best-sellers">Find your next favourite <ArrowRight aria-hidden="true" /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}