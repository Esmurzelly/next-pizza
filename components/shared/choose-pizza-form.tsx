import { cn } from '@/lib/utils';
import { Product } from '@prisma/client'
import React, { useState } from 'react'
import { PizzaImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';
import GroupVariant from './group-variant';
import { PizzaSize, pizzaSizes, PizzaType } from '@/constants/pizza';

type Props = {
    imageUrl: string;
    name: string;
    // ingredients: IProduct[];
    // items?: IProduct[];
    ingredients: any[];
    items?: any[];
    onClickAdd?: VoidFunction
    className?: string;
}

export const ChoosePizzaForm = ({ imageUrl, ingredients, name, items, onClickAdd, className }: Props) => {
    const textDetails = '30 см, традиционное тесто 30';
    const totalPrice = 350;

    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />

                <p className='text-gray-400'>{textDetails}</p>

                <GroupVariant items={pizzaSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />

                <Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                    Добавить в корзину за {totalPrice}
                </Button>
            </div>
        </div>
    )
}

export default ChoosePizzaForm