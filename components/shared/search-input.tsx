'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClickAway, useDebounce } from 'react-use'
import Link from 'next/link'
import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'

type Props = {
    className?: string
}

export const SearchInput = ({ className }: Props) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [focused, setFocused] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false)
    });

    useDebounce(() => {
        async () => {
            try {
                const response = await Api.products.search(searchQuery);
                setProducts(response);      
            } catch (error) {
                console.log(error);
            };
        };

        // Api.products.search(searchQuery).then(items => {
        //     setProducts(items);
        // });
    },
        250,
        [searchQuery]
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    }

    return (
        <>
            {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

            <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
                <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
                <input
                    className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
                    type="text"
                    placeholder='Найти пиццу...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                />

                {products.length > 0 && <div className={cn(
                    'absolute w-full bg-white top-14 rounded-xl py-2 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                    focused && 'visible top-12 opacity-100'
                )}>
                    {products.map(product => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-primary/10'
                            onClick={onClickItem}
                        >
                            <img
                                className='rounded-sm w-8 h-8'
                                src={product.imageUrl}
                                alt={product.name}
                            />
                            <div className=''>
                                {product.name}
                            </div>
                        </Link>
                    ))}
                </div>}
            </div>
        </>
    )
}