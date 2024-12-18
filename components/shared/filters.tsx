'use client'

import React from 'react'
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

import { useIngredients, useFilters, useQueryFilters } from '@/hook'

type Props = {
    className?: string;
}

export const Filters = ({ className }: Props) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    }

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
                onClickCheckbox={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
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
                onClickCheckbox={filters.setSizes}
                selected={filters.sizes}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до: </p>
                <div className="flex gap-3 mb-5">
                    <Input type='number' placeholder='0' min={0} max={1000} value={String(filters.prices.priceFrom)} onChange={e => filters.setPrices('priceFrom', Number(e.target.value))} />
                    <Input type='number' placeholder='1000' min={100} max={1000} value={String(filters.prices.priceTo)} onChange={e => filters.setPrices('priceTo', Number(e.target.value))} />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={updatePrices}
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
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
                onClickCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />
        </div>
    )
}