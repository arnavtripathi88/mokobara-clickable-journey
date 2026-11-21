import aisleTrunkImage from "@/assets/aisle-trunk.webp.asset.json";
import packingCubesImage from "@/assets/packing-cubes.webp.asset.json";
import skyeBlackImage from "@/assets/skye-black.webp.asset.json";
import skyeStillLoadingImage from "@/assets/skye-still-loading.webp.asset.json";
import skyeToteImage from "@/assets/skye-tote.webp.asset.json";
import teleporterImage from "@/assets/teleporter.webp.asset.json";
import transitBackpackImage from "@/assets/transit-backpack.webp.asset.json";
import transitHomegrownImage from "@/assets/transit-homegrown.webp.asset.json";
import transitPrivateIslandImage from "@/assets/transit-private-island.webp.asset.json";
import transitSetImage from "@/assets/transit-set.webp.asset.json";
import transitSetExcuseMeImage from "@/assets/transit-set-excuse-me.webp.asset.json";
import transitSetShyBlueImage from "@/assets/transit-set-shy-blue.webp.asset.json";

export type ProductCategory = "Luggage" | "Backpacks" | "Totes" | "Accessories";

export type ProductVariant = {
  name: string;
  image: string;
};

export type StorefrontProduct = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: string;
  compareAt: string;
  color: string;
  image: string;
  description: string;
  variants?: ProductVariant[];
  highlights: string[];
  specs: { label: string; value: string }[];
};

export const categoryFilters = ["All", "Luggage", "Backpacks", "Totes", "Accessories"] as const;
export type CategoryFilter = (typeof categoryFilters)[number];

export const products: StorefrontProduct[] = [
  {
    slug: "the-transit-backpack",
    name: "Transit Backpack - 30L",
    category: "Backpacks",
    price: "₹4,999",
    compareAt: "₹9,999",
    color: "Money Moves Sunray",
    image: transitBackpackImage.url,
    description: "Everyday functionality with a clean, minimalist shape and thoughtful pockets for life on the move.",
    variants: [
      { name: "Money Moves Sunray", image: transitBackpackImage.url },
      { name: "Home Grown Sunray", image: transitHomegrownImage.url },
      { name: "Private Island", image: transitPrivateIslandImage.url },
    ],
    highlights: [
      "Padded laptop compartment fits up to a 16-inch laptop.",
      "A luggage sleeve connects to a Mokobara suitcase.",
      "Hidden bottle and umbrella pockets keep the silhouette neat.",
    ],
    specs: [
      { label: "Capacity", value: "30 L" },
      { label: "Weight", value: "1.16 kg" },
      { label: "Warranty", value: "12 months" },
    ],
  },
  {
    slug: "the-transit-luggage-set-of-3",
    name: "Transit Luggage — Set of 3",
    category: "Luggage",
    price: "₹15,999",
    compareAt: "₹38,999",
    color: "We Meet Again Sunray",
    image: transitSetImage.url,
    description: "Three coordinating suitcases for weekend escapes, longer trips, and everything in between.",
    variants: [
      { name: "We Meet Again Sunray", image: transitSetImage.url },
      { name: "Shy Blue", image: transitSetShyBlueImage.url },
      { name: "Excuse Me", image: transitSetExcuseMeImage.url },
    ],
    highlights: [
      "Three sizes give you room for trips of every length.",
      "The set combines 40 L, 65 L, and 100 L capacities.",
      "Includes three years of warranty and airline damage cover.",
    ],
    specs: [
      { label: "Pieces", value: "3 suitcases" },
      { label: "Combined capacity", value: "205 L" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    slug: "the-skye-tote",
    name: "Skye Tote",
    category: "Totes",
    price: "₹5,999",
    compareAt: "₹9,499",
    color: "Coconut Cream",
    image: skyeToteImage.url,
    description: "A polished everyday tote with room for your workday essentials and a little more.",
    variants: [
      { name: "Coconut Cream", image: skyeToteImage.url },
      { name: "24k Mokogram Black", image: skyeBlackImage.url },
      { name: "Still Loading", image: skyeStillLoadingImage.url },
    ],
    highlights: [
      "Water-resistant canvas with vegan leather trims.",
      "Padded laptop sleeve fits up to a 14-inch laptop.",
      "A luggage sleeve slips over your suitcase handle.",
    ],
    specs: [
      { label: "Capacity", value: "19 L" },
      { label: "Weight", value: "1 kg" },
      { label: "Warranty", value: "12 months" },
    ],
  },
  {
    slug: "the-aisle-trunk-check-in",
    name: "Aisle Trunk — Check-in",
    category: "Luggage",
    price: "₹5,599",
    compareAt: "₹12,999",
    color: "Shy Blue",
    image: aisleTrunkImage.url,
    description: "A check-in suitcase in a soft blue finish, ready for the longer route.",
    highlights: ["A roomy check-in format for longer journeys."],
    specs: [{ label: "Colour", value: "Shy Blue" }],
  },
  {
    slug: "the-packing-cubes-set-of-6",
    name: "Packing Cubes — Set of 6",
    category: "Accessories",
    price: "₹1,499",
    compareAt: "₹3,499",
    color: "Still Loading Sunray",
    image: packingCubesImage.url,
    description: "Six packing cubes to give everything in your suitcase its own place.",
    highlights: ["A six-piece set for packing and unpacking with ease."],
    specs: [{ label: "Pieces", value: "6 cubes" }],
  },
  {
    slug: "teleporter-toggle-backpack",
    name: "Teleporter Toggle Backpack",
    category: "Backpacks",
    price: "₹10,999",
    compareAt: "₹14,999",
    color: "Money Moves Sunray",
    image: teleporterImage.url,
    description: "A sleek black backpack from the Toggle series, made for days that move between places.",
    highlights: ["A structured carry-all for work, travel, and the in-between."],
    specs: [{ label: "Colour", value: "Money Moves Sunray" }],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}