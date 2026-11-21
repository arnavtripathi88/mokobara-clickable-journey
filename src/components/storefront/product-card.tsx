import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { StorefrontProduct } from "@/lib/storefront-data";

export function ProductCard({ product }: { product: StorefrontProduct }) {
  return (
    <article className="product-card">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="product-card__image-link"
        aria-label={`View ${product.name}`}
      >
        <div className="product-card__image-wrap">
          <img className="product-card__image" src={product.image} alt={product.name} loading="lazy" />
          <span className="product-card__arrow" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </div>
      </Link>
      <div className="product-card__copy">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span>{product.color}</span>
        </div>
        <h3>
          <Link to="/products/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <div className="product-card__price">
          <span>{product.price}</span>
          <del>{product.compareAt}</del>
        </div>
      </div>
    </article>
  );
}