'use client'

import { Dialog } from '@/components/ui'
import React from 'react'
import { Product } from '@prisma/client'
import { DialogContent } from '@/components/ui/dialog'
import { Title } from '../title'
import { useRouter } from 'next/navigation'
import ChooseProductForm from '../choose-product-form'
import { IProduct } from '@/@types/prisma'
import ChoosePizzaForm from '../choose-pizza-form'
import { DialogTitle } from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'


type Props = {
  product: IProduct;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        <VisuallyHidden.Root>
          <DialogTitle></DialogTitle>
        </VisuallyHidden.Root>

        {
          isPizzaForm ? (
            <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} items={product.items} ingredients={product.ingredients} />
          ) : (
            <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default ChooseProductModal