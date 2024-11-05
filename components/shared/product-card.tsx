import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

interface Props {
    className?: string
    id: number
    name: string
    price: number
    imageUrl: string
}

export const ProductCard = ({ className, id, name, price, imageUrl }: Props) => {
  return (
    <div className={className}>
        <Link href={''}>
            <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                <img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
            </div>

            <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

            <p className="text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam consequuntur nobis!
            </p>

            <div className="flex justify-between items-center mt-4">
                <span className='text-[20px]'>
                    от <b>{price} рублей </b>
                </span>

                <Button variant={'secondary'}>
                    <Plus size={20} className='mr-1'>
                        Добавить
                    </Plus>
                </Button>
            </div>
        </Link>
    </div>
  )
}