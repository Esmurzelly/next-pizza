'use client'

import React, { useEffect } from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/categoty'

type Props = {
    className?: string
    title: string
    items: any[]
    listClassName?: string
    categoryId: number
}

export const ProductsGroupList = ({ className, categoryId, items, title, listClassName }: Props) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if(intersection?.isIntersecting) { // если блок в области видимости 
            setActiveCategoryId(categoryId);
        } 
    }, [categoryId, intersection?.isIntersecting, title]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size='lg' className='font-extrabold mb-5' />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                    />
                ))}
            </div>
        </div>
    )
}