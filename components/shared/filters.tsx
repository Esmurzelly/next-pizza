'use client'

import React, { useEffect, useState } from 'react'
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/hook/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
    className?: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilter extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export const Filters = ({ className }: Props) => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilter, string>
    const router = useRouter();
    const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients(
        searchParams.get('ingredients')?.split(',')
    );
    
    const [sizes, { toggle: toggleSizes }] = useSet<string>(new Set(
        searchParams.has('sizes') ? searchParams.get('sizes')?.split(",") : []
    ));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet<string>(new Set(
        searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(",") : []
    ));

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value
        })
    };

    useEffect(() => {
        const filters = {
            ...prices,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients),
        };

        const query = qs.stringify(filters, {
            arrayFormat: "comma",
        });

        router.push(`?${query}`, {
            scroll: false
        });
    }, [prices, selectedIngredients, sizes, pizzaTypes, router]);

    return (
        <div className={className}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

            <CheckboxFiltersGroup
                title='Размеры'
                name='sizes'
                className='mt-5'
                limit={6}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
                loading={loading}
                onClickCheckbox={togglePizzaTypes}
                selected={pizzaTypes}
            />

            <CheckboxFiltersGroup
                title='Размеры'
                name='sizes'
                className='mt-5'
                limit={6}
                items={[
                    { text: '20cm', value: '20' },
                    { text: '30cm', value: '30' },
                    { text: '40cm', value: '40' },
                ]}
                loading={loading}
                onClickCheckbox={toggleSizes}
                selected={sizes}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до: </p>
                <div className="flex gap-3 mb-5">
                    <Input type='number' placeholder='0' min={0} max={1000} value={String(prices.priceFrom)} onChange={e => updatePrice('priceFrom', Number(e.target.value))} />
                    <Input type='number' placeholder='1000' min={100} max={1000} value={String(prices.priceTo)} onChange={e => updatePrice('priceTo', Number(e.target.value))} />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={([from, to]) => setPrice({ priceFrom: from, priceTo: to })}
                    value={[prices.priceFrom || 0, prices.priceTo || 0]}
                />
            </div>

            <CheckboxFiltersGroup
                title='Ингридиенты'
                name='ingredients'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
            />
        </div>
    )
}