'use client'

import React, { ReactNode, useEffect } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartItemDrawer } from './cart-item-drawer';
import { getCartItemDetails } from '@/lib';
import { useCartStore } from '@/store/cart';
import { PizzaSize, PizzaType } from '@/constants/pizza';


type Props = {
    className?: string;
    children: ReactNode;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }: Props) => {
    const totalAmount = useCartStore(state => state.totalAmount);
    const items = useCartStore(state => state.items);
    const fetchCartItems = useCartStore(state => state.fetchCartItems);

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className='font-bold'>3 товара</span>
                    </SheetTitle>
                </SheetHeader>

                <div className='-mx-6 mt-5 overflow-auto flex-1'>
                    <div className="mb-2">
                        {
                            items.map(item => (
                                <CartItemDrawer
                                    id={item.id}
                                    imageUrl={item.imageUrl}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    details={
                                        item.pizzaSize && item.pizzaType
                                        ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                                        : ''
                                    }
                                />
                            ))
                        }
                    </div>
                </div>

                <SheetFooter className='-mx-6 bg-white p-8'>
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                Итого

                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>

                            <span className='font-bold text-lg'>{totalAmount} Р</span>
                        </div>

                        <Link href={'/cart'}>
                            <Button
                                type='submit'
                                className='w-full h-12 text-base'>
                                Оформить заказ
                                <ArrowRight className='w-5 ml-2' />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
