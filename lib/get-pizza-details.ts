import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { calcTotalPizzaSize } from "./calc-total-pizza-price";
import { Ingredient, ProductItem } from "@prisma/client";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcTotalPizzaSize(type, size, items, ingredients, selectedIngredients);
    const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

    return {
        totalPrice,
        textDetails
    }
}