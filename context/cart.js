"use client";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined" && localStorage.getItem("cartItems")) {
      return JSON.parse(localStorage.getItem("cartItems"));
    }
    return [];
  });

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );

    // If the item is already in the cart, remove it
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.name !== item.name));
    } else {
      // If the item is already in the cart, decrement the quantity
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
    }
  };
  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  // Persist cart items in local storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItems = localStorage.getItem("cartItems");

      if (cartItems) {
        setCartItems(JSON.parse(cartItems));
      }
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
