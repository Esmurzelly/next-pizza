import { create } from "zustand";
import { getCartDetails } from "@/lib";
import { CartStateItem } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: any) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchCart();
            set(getCartDetails(data));
        } catch (error) {
            console.log(error)
            set({ error: true })
        }
    },
    removeCartItem: async (id: number) => { },
    updateItemQuantity: async (id: number, quantity: number) => { },
    addCartItem: async (id: number) => { },
}));