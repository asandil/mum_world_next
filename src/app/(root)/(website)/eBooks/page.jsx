"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import ProductModal from "@/components/ProductModal";
import ProductHeader from "@/components/ProductHeader";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Motherhood Poetry Collection | Heartfelt Verses by MumWorld",
//   description: "Dive into the emotional world of motherhood through beautifully written poems that capture joy, love, and the journey of being a mom.",
//   keywords: "pregnancy blog, parenting articles, motherhood blog, baby care tips",
// }

// Sample product data
const productsData = [
  {
    id: 1,
    title: "Trimester By Trimester Pregnancy Guide – Indian Moms Edition",
    pdfUrl: "/pdfs/indian-pregnancy-guide.pdf",
    image:
      "https://res.cloudinary.com/dc0wr8hev/image/upload/v1757874092/Trimester_by_Trimester_Pregnancy_Guide-Indian_Mom_Edition-_image_lvc6lm.png",
    description:
      "Pregnancy is a magical journey, but each trimester brings new changes, challenges, and questions. That's why we created the Trimester-by-Trimester Pregnancy Guide—your complete 7-page premium PDF designed specially for Indian mothers.",
    price: {
      current: 99,
      regular: 199,
      currency: "₹",
    },
    what_Inside: {
      first_trimester: [
        "Body changes",
        "Doctor visits",
        "Indian diet tips",
        "Safe practices",
      ],
      second_trimester: [
        "Energy boost",
        "Baby movements",
        "Anomaly scan",
        "Yoga",
        "Stretch mark care",
      ],
      third_trimester: [
        "Swelling",
        "Back pain",
        "Frequent checkups",
        "Labor prep",
        "Hospital bag essentials",
      ],
    },
    bonus_Section: {
      bonus_Section_1: "Hospital Bag Checklist (India edition)",
      bonus_Section_2: "Indian Superfoods List for pregnancy",
      bonus_Section_3: "Delivery Day Quick Checklist",
    },
    why_Buy_This_Guide: [
      "Tailored for Indian lifestyle & culture",
      "Saves endless Google searches",
      "Covers body, mind, diet & care trimester by trimester",
      "Affordable price",
      "Perfect for first-time moms or as a gift",
    ],
  },
  {
    id: 2,
    title: "Trimester By Trimester Pregnancy Guide – Overseas Moms Edition",
    pdfUrl: "/pdfs/overseas-pregnancy-guide.pdf",
    image:
      "https://res.cloudinary.com/dc0wr8hev/image/upload/v1757874091/Premium_Breastfeeding_Guide-_Image_oh5i6v.png",
    description:
      "Everything you need to know about caring for your newborn in the first few months. Designed specifically for Indian parents.",
    price: {
      current: 149,
      regular: 249,
      currency: "₹",
    },
    what_Inside: {
      first_trimester: [
        "Feeding guidelines",
        "Sleep patterns",
        "Bathing your newborn",
        "Diapering basics",
      ],
      second_trimester: [
        "Developmental milestones",
        "Immunization guide",
        "Common health concerns",
        "Soothing techniques",
      ],
      third_trimester: [
        "Introducing solids",
        "Sleep training",
        "Baby-proofing your home",
        "Choosing childcare",
      ],
    },
    bonus_Section: {
      bonus_Section_1: "Newborn Shopping Checklist",
      bonus_Section_2: "Vaccination Schedule",
      bonus_Section_3: "Common Newborn Issues Guide",
    },
    why_Buy_This_Guide: [
      "Specifically designed for Indian climate and culture",
      "Expert-approved content",
      "Saves time and reduces stress",
      "Comprehensive coverage of newborn care",
      "Perfect gift for expecting parents",
    ],
  },
  {
    id: 3,
    title: "Hospital Bag Checklist",
    pdfUrl:
      "/pdfs/trimester-by-trimester-pregnancy-guide-overseas-moms-edition.pdf",
    image:
      "https://res.cloudinary.com/dc0wr8hev/image/upload/v1757874091/Trimester_by_Trimester_Pregnancy_Guide-Overseas_Moms_Edition-_image_vbkbps.jpg",
    description:
      "A comprehensive guide to help new mothers recover after childbirth, with special focus on Indian traditions and practices.",
    price: {
      current: 129,
      regular: 199,
      currency: "₹",
    },
    what_Inside: {
      first_trimester: [
        "Physical recovery timeline",
        "Dealing with body changes",
        "Postpartum nutrition",
        "Rest and sleep guidance",
      ],
      second_trimester: [
        "Emotional wellness",
        "Bonding with your baby",
        "Breastfeeding support",
        "Exercises for recovery",
      ],
      third_trimester: [
        "Returning to work",
        "Balancing motherhood",
        "Self-care strategies",
        "Long-term health tips",
      ],
    },
    bonus_Section: {
      bonus_Section_1: "Postpartum Meal Plans",
      bonus_Section_2: "Recovery Timeline",
      bonus_Section_3: "Emotional Wellness Guide",
    },
    why_Buy_This_Guide: [
      "Blends modern science with traditional Indian practices",
      "Supports holistic recovery",
      "Easy-to-follow meal plans",
      "Emotional wellness focus",
      "Affordable and accessible",
    ],
  },
  // {
  //   id: 4,
  //   title: "Premium Breastfeeding Guide",
  //   pdfUrl: "/pdfs/Hospital-bag-Checklist.pdf",
  //   image:
  //     "https://res.cloudinary.com/dc0wr8hev/image/upload/v1757874090/Hospital_bag_Checklist-_image_h0wh4o.png",
  //   description:
  //     "A comprehensive guide to help new mothers recover after childbirth, with special focus on Indian traditions and practices.",
  //   price: {
  //     current: 129,
  //     regular: 199,
  //     currency: "₹",
  //   },
  //   what_Inside: {
  //     first_trimester: [
  //       "Physical recovery timeline",
  //       "Dealing with body changes",
  //       "Postpartum nutrition",
  //       "Rest and sleep guidance",
  //     ],
  //     second_trimester: [
  //       "Emotional wellness",
  //       "Bonding with your baby",
  //       "Breastfeeding support",
  //       "Exercises for recovery",
  //     ],
  //     third_trimester: [
  //       "Returning to work",
  //       "Balancing motherhood",
  //       "Self-care strategies",
  //       "Long-term health tips",
  //     ],
  //   },
  //   bonus_Section: {
  //     bonus_Section_1: "Postpartum Meal Plans",
  //     bonus_Section_2: "Recovery Timeline",
  //     bonus_Section_3: "Emotional Wellness Guide",
  //   },
  //   why_Buy_This_Guide: [
  //     "Blends modern science with traditional Indian practices",
  //     "Supports holistic recovery",
  //     "Easy-to-follow meal plans",
  //     "Emotional wellness focus",
  //     "Affordable and accessible",
  //   ],
  // },
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const viewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const checkout = () => {
    // Save current cart to orders
    const savedOrders = localStorage.getItem("orders");
    const previousOrders = savedOrders ? JSON.parse(savedOrders) : [];

    // Ensure each product has correct PDF path
    const ordersWithValidPdf = cart.map((product) => ({
      ...product,
      pdfUrl: product.pdfUrl || "/pdfs/default.pdf", // Fallback if missing
    }));

    const updatedOrders = [...previousOrders, ...ordersWithValidPdf];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear cart
    setCart([]);
    localStorage.removeItem("cart");

    setShowCart(false);
    router.push("/orders");
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className=" ">
      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={checkout}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={closeModal}
        onAddToCart={addToCart}
      />

      {/* Main Content */}
      <main className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        {/* Header */}
        <ProductHeader cartCount={cart.length} onCartClick={toggleCart} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[80px] gap-8">
          {productsData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={viewDetails}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
