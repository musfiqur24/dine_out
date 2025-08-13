import React, { useState } from "react";
import { FOOD_ITEMS } from "../data/foodItems";
import FoodItemCard from "./FoodItemCard";

export default function CreateOrderForm({ onPlaceOrder }) {
  const [customerName, setCustomerName] = useState("");
  const [cart, setCart] = useState([]);

  const increment = (id) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const decrement = (id) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (!exists) return prev;
      if (exists.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const total = cart.reduce((sum, cartItem) => {
    const food = FOOD_ITEMS.find((f) => f.id === cartItem.id);
    return sum + (food ? food.price * cartItem.quantity : 0);
  }, 0);

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const items = cart.map((cartItem) => {
      const food = FOOD_ITEMS.find((f) => f.id === cartItem.id);
      return {
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: cartItem.quantity,
      };
    });

    onPlaceOrder({
      customerName: customerName.trim(),
      items,
      amount: total,
    });
    setCustomerName("");
    setCart([]);
  };

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)] flex flex-col">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          type="text"
          className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
        />
      </div>

      <div className="mb-4 flex-1 overflow-auto">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {FOOD_ITEMS.map((item) => {
            const cartItem = cart.find((c) => c.id === item.id);
            return (
              <FoodItemCard
                key={item.id}
                item={item}
                quantity={cartItem ? cartItem.quantity : 0}
                onIncrement={increment}
                onDecrement={decrement}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      >
        Place Order (BDT {total})
      </button>
    </div>
  );
}
