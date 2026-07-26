export interface Saree {
  id: string;
  name: string;
  category: string;
  material: string;
  price: string;
  description: string;
  image: string;
  details: string[];
  inStock: boolean;
  craftName: string;
  origin: string;
}

export const SAREE_COLLECTION: Saree[] = [
  {
    id: "saree-crimson-gold",
    name: "Adrika Crimson Zari",
    category: "Traditional Handloom",
    material: "Pure Handloom Cotton & Fine Gold Zari",
    price: "₹4,850",
    description: "An exquisite crimson red handloom cotton saree featuring intricate gold zari borders. Hand-woven by master weavers in Madhya Pradesh, it captures traditional elegance with lightweight breathability and comfort.",
    image: "/images/saree_crimson_gold.jpg",
    craftName: "Maheshwari Handloom",
    origin: "Madhya Pradesh, India",
    inStock: true,
    details: [
      "Weave Count: 80s fine combed cotton",
      "Saree Length: 5.5 meters",
      "Blouse: Includes running unstitched blouse piece (80cm)",
      "Craft Type: Handloom weave with supplementary gold thread borders",
      "Care: Dry clean recommended for first few washes; subsequently hand wash cold with mild detergent"
    ]
  },
  {
    id: "saree-emerald-handloom",
    name: "Vaikuntha Emerald",
    category: "Heritage Cotton-Silk",
    material: "Fine Handloom Cotton-Silk Blend",
    price: "₹6,200",
    description: "A deep emerald green handloom saree with traditional paisley-inspired golden borders, draping elegantly with a subtle sheen. Perfect for both festive celebrations and evening gatherings.",
    image: "/images/saree_emerald_handloom.jpg",
    craftName: "Zari Butta Weave",
    origin: "Chanderi, Madhya Pradesh",
    inStock: true,
    details: [
      "Weave Count: 100s fine cotton-silk warp and weft",
      "Saree Length: 5.5 meters",
      "Blouse: Contrast pure silk blouse piece included (80cm)",
      "Craft Type: Handloom Jacquard-woven traditional borders",
      "Care: Dry clean only to preserve the silk blend sheen and zari brightness"
    ]
  },
  {
    id: "saree-indigo-ajrakh",
    name: "Mayura Indigo Ajrakh",
    category: "Artisanal block Print",
    material: "100% Organic Handloom Cotton",
    price: "₹3,950",
    description: "Colored with organic indigo vegetable dyes, this saree showcases rich, authentic Ajrakh hand-block prints, finished with fine gold zari borders. Made by generations of printing artisans in Kachchh.",
    image: "/images/saree_indigo_ajrakh.jpg",
    craftName: "Double-Sided Ajrakh Block Printing",
    origin: "Kachchh, Gujarat",
    inStock: true,
    details: [
      "Weave Count: 60s organic cotton handloom fabric",
      "Saree Length: 5.5 meters",
      "Blouse: Attached matching printed blouse piece (80cm)",
      "Craft Type: Handblock print using natural plant and mineral dyes",
      "Care: Gentle cold hand wash separately. Dry in shade inside-out. Color bleeding may occur in initial wash due to natural indigo."
    ]
  },
  {
    id: "saree-mustard-khadi",
    name: "Swarnalata Mustard Khadi",
    category: "Khadi & Handspun",
    material: "Handspun Khadi Cotton",
    price: "₹5,400",
    description: "A warm mustard yellow handspun Khadi cotton saree featuring a detailed geometric border and textured weave, finished with a charcoal grey pallu. Exceptionally breathable, soft, and structure-retaining.",
    image: "/images/saree_mustard_khadi.jpg",
    craftName: "Hand-spun & Hand-woven Khadi",
    origin: "West Bengal, India",
    inStock: true,
    details: [
      "Weave Count: Handspun uneven cotton slub yarn",
      "Saree Length: 5.5 meters",
      "Blouse: Charcoal grey contrast solid blouse piece included (80cm)",
      "Craft Type: Handspun yarn woven on traditional pit looms",
      "Care: Dry clean preferred, or mild shampoo hand wash. Starch slightly to maintain crisp structural drape."
    ]
  }
];
