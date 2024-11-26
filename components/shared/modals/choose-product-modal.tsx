'use client'

import { Dialog } from '@/components/ui'
import React from 'react'
import { Product } from '@prisma/client'
import { DialogContent } from '@/components/ui/dialog'
import { Title } from '../title'
import { useRouter } from 'next/navigation'

type Props = {
  product: Product;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        <Title text={product.name} />
      </DialogContent>
    </Dialog>
  )
}

export default ChooseProductModal