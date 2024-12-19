import { Cart } from "@prisma/client";
import { axiosInstance } from "./instance"
import { CartDTO } from "./dto/cart.dto";

export const fetchCart = async (): Promise<CartDTO> => {
    const { data: { userCart } } = await axiosInstance.get<{ userCart: CartDTO }>('/cart');

    return userCart;
}