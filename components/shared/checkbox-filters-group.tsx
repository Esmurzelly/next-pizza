'use client';

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
    className?: string;
    title: string;
    defaultItems?: Item[];
    items: Item[];
    limit: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    selected: Set<string>
    defaultValue?: string[];
    name: string
}

export const CheckboxFiltersGroup = ({
    className,
    title,
    defaultItems,
    items,
    loading,
    limit = 5,
    searchInputPlaceholder = 'Поиск',
    onClickCheckbox,
    selected,
    name,
    defaultValue
}: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    
    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const list = showAll
        ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems || items).slice(0, limit);

    if (loading) {
        return <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {
                ...Array(limit).fill(0).map((_, index) => (
                    <Skeleton key={index} className='mb-5 h-6 rounded-[8px]' />
                ))
            }
            <Skeleton className='w-28 mb-5 h-6 rounded-[8px]' />

        </div>
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && <div className="mb-5">
                <Input onChange={onChangeSearchValue} placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
            </div>}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)}
                        name={name}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                        {showAll ? 'Скрыть' : ' + Показать всё'}
                    </button>
                </div>
            )}
        </div>
    )
}