import { Variant } from "@/components/shared/group-variant";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "./get-available-pizza-sizes";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    selectedIngredients: Set<number>;
    addIngredient: (id: number) => void;
    availableSizes: Variant[]
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
    const availableSizes = getAvailablePizzaSizes(items, type);

    useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled,
        );
        const availableSize = availableSizes?.find(items => !items.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        setSize,
        type,
        setType,
        selectedIngredients,
        addIngredient,
        availableSizes
    };
};