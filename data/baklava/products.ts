import type { Product } from "@/types/product";
import { additionalBaklavaProducts } from "./additional-products";

const imagePath = "/brands/baklava/products/";

// The first two names/prices are visible in the supplied menu reference.
// Unconfirmed product names use explicitly marked descriptive labels.
export const baklavaProducts: Product[] = [
  {
    id: "rolled-milk-honey",
    name: "پیچی شیرعسل",
    image: imagePath + "Pistachio-Garnished Golden Pastry on White Plate.png",
    imageAlt: "باقلوا پیچی طلایی با تزئین پسته روی بشقاب سفید",
    price: 48000,
    category: "baklava",
  },
  {
    id: "heart-milk-honey",
    name: "قلبی شیر عسل",
    image: imagePath + "Pistachio pastry on a white plate.png",
    imageAlt: "باقلوا قلبی با تزئین پسته روی بشقاب سفید",
    price: 52000,
    category: "baklava",
  },
  {
    id: "pistachio-pastry",
    name: "باقلوا با تزئین پسته",
    image: imagePath + "Pistachio pastry on a white plate (1).png",
    imageAlt: "باقلوا لایه‌ای با پسته روی بشقاب سفید",
    category: "baklava",
    temporaryLabel: true,
  },
  {
    id: "chocolate-dessert",
    name: "دسر با تزئین شکلات",
    image: imagePath + "Chocolate dessert on white plate.png",
    imageAlt: "دسر با تراشه‌های شکلات روی بشقاب سفید",
    category: "dessert",
    temporaryLabel: true,
  },
  ...additionalBaklavaProducts,
];
