'use client'

import { cn } from '@/lib/utils';
import { Ingredient, Product, ProductItem } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { PizzaImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';
import GroupVariant from './group-variant';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/constants/pizza';
import IngredientItem from './ingredient-item';
import { useSet } from 'react-use';
import { IProduct } from '@/@types/prisma';
import { calcTotalPizzaSize, getAvailablePizzaSizes, getPizzaDetails, usePizzaOptions } from '@/lib';

type Props = {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    // items: IProduct['items'];
    items: ProductItem[];
    onClickAddCart?: VoidFunction
    className?: string;
}

export const ChoosePizzaForm = ({ imageUrl, ingredients, name, items, onClickAddCart, className }: Props) => {
    const {
        size,
        type,
        setSize,
        setType,
        availableSizes,
        addIngredient,
        selectedIngredients
    } = usePizzaOptions(items);

    const {
        textDetails,
        totalPrice
    } = getPizzaDetails(type, size, items, ingredients, selectedIngredients);
 
    const handleClickAdd = () => {
        onClickAddCart?.();
        console.log({
            size,
            type,
            ingredients: selectedIngredients
        })
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />

                <p className='text-gray-400'>{textDetails}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariant items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
                    <GroupVariant items={pizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
                </div>

                <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map(ingredient => (
                            <IngredientItem
                                key={ingredient.id}
                                imageUrl={ingredient.imageUrl}
                                name={ingredient.name}
                                price={ingredient.price}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                    Добавить в корзину за {totalPrice}
                </Button>
            </div>
        </div>
    )
}

export default ChoosePizzaForm