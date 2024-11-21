import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilter extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilter, string>;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(',')),
      );

    const [sizes, { toggle: toggleSizes }] = useSet<string>(new Set(
        searchParams.has('sizes') ? searchParams.get('sizes')?.split(",") : []
    ));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet<string>(new Set(
        searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(",") : []
    ));

    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    return useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            setPrices: updatePrice,
            setPizzaTypes: togglePizzaTypes,
            setSizes: toggleSizes,
            setSelectedIngredients: toggleIngredients,
        }),
        [sizes, pizzaTypes, selectedIngredients, prices],
    );
}