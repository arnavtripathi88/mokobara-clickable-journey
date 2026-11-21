import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/product-card";
import { SiteFooter } from "@/components/storefront/site-footer";
import { SiteHeader } from "@/components/storefront/site-header";
import { getProductBySlug, products } from "@/lib/storefront-data";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    const title = product ? `${product.name} | Mokobara` : "Travel essentials | Mokobara";
    const description = product?.description ?? "Explore thoughtfully designed luggage and travel essentials from Mokobara.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <div className="storefront-page">
      <SiteHeader />
      <main className="product-page">
        <div className="product-breadcrumbs">
          <Link to="/"><ArrowLeft aria-hidden="true" /> Shop</Link>
          <span aria-hidden="true">/</span>
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </div>
        <ProductDetail key={product.slug} product={product} />
        <section className="related-section" aria-labelledby="related-title">
          <div className="section-heading section-heading--bestsellers">
            <div>
              <p className="eyebrow">Keep exploring</p>
              <h2 id="related-title">You may also like.</h2>
            </div>
            <Link to="/#best-sellers" className="text-link">See all favourites <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="product-grid product-grid--related">
            {relatedProducts.map((item) => <ProductCard key={item.slug} product={item} />)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ProductDetail({ product }: { product: (typeof products)[number] }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "specifications">("details");
  const variant = product.variants?.[variantIndex];
  const image = variant?.image ?? product.image;
  const color = variant?.name ?? product.color;

  return (
    <section className="product-detail" aria-labelledby="product-title">
      <div className="product-detail__visual">
        <div className="product-detail__main-image">
          <img src={image} alt={`${product.name} in ${color}`} fetchPriority="high" />
          <span className="product-detail__image-count">
            {product.variants && product.variants.length > 1 ? `${variantIndex + 1} / ${product.variants.length}` : "MOKOBARA"}
          </span>
        </div>
        {product.variants && product.variants.length > 1 && (
          <div className="product-variant-gallery" aria-label="Choose a colour">
            {product.variants.map((item, index) => (
              <Button
                key={item.name}
                type="button"
                variant="ghost"
                className={`product-variant-gallery__thumb${variantIndex === index ? " is-selected" : ""}`}
                aria-label={`Choose ${item.name}`}
                aria-pressed={variantIndex === index}
                onClick={() => setVariantIndex(index)}
              >
                <img src={item.image} alt="" loading="lazy" />
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="product-detail__info">
        <p className="eyebrow">{product.category} / MOKOBARA</p>
        <h1 id="product-title">{product.name}</h1>
        <p className="product-detail__description">{product.description}</p>
        <div className="product-detail__price">
          <strong>{product.price}</strong>
          <del>{product.compareAt}</del>
          <span>Inclusive of all taxes</span>
        </div>

        {product.variants && product.variants.length > 1 && (
          <div className="product-variant-picker">
            <div className="product-variant-picker__label">
              <span>Colour</span>
              <strong>{color}</strong>
            </div>
            <div className="product-variant-picker__options">
              {product.variants.map((item, index) => (
                <Button
                  key={item.name}
                  type="button"
                  variant={variantIndex === index ? "default" : "outline"}
                  size="sm"
                  aria-pressed={variantIndex === index}
                  onClick={() => setVariantIndex(index)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="product-purchase-row">
          <div className="quantity-stepper" aria-label="Quantity">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              <Minus aria-hidden="true" />
            </Button>
            <span aria-live="polite">{quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Increase quantity"
              onClick={() => setQuantity((value) => value + 1)}
            >
              <Plus aria-hidden="true" />
            </Button>
          </div>
          <Button
            type="button"
            size="lg"
            className="product-add-button"
            onClick={() => setAddedToBag((added) => !added)}
          >
            {addedToBag ? <Check aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}
            {addedToBag ? "Added to bag" : "Add to bag"}
          </Button>
        </div>

        {addedToBag && (
          <p className="product-added-note" role="status">
            {quantity} × {product.name} added to your preview bag.
          </p>
        )}

        <div className="product-details-panel">
          <div className="product-details-panel__tabs" role="tablist" aria-label="Product information">
            <Button
              type="button"
              role="tab"
              aria-selected={activeTab === "details"}
              variant={activeTab === "details" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("details")}
            >
              Details
            </Button>
            <Button
              type="button"
              role="tab"
              aria-selected={activeTab === "specifications"}
              variant={activeTab === "specifications" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </Button>
          </div>
          {activeTab === "details" ? (
            <ul className="product-highlights" role="tabpanel">
              {product.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          ) : (
            <dl className="product-specifications" role="tabpanel">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <Link to="/#best-sellers" className="product-detail__back-link">
          <ArrowLeft aria-hidden="true" /> Continue exploring
        </Link>
      </div>
    </section>
  );
}