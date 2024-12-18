import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true
        }
      }
    }
  });

  console.log('categories', categories);

  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold" />
    </Container>

    <TopBar categories={categories.filter((item) => item.products.length > 0)} />

    <Container className="pb-14 mt-10">
      <div className="flex gap-[60px]">
        {/* Filter */}
        <div className="w-[250px]">
          <Filters />
        </div>

        {/* Goods list */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {
              categories.map((category) => (
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    categoryId={category.id}
                    title={category.name}
                    items={category.products}
                  />
                )
              ))
            }
          </div>
        </div>
      </div>
    </Container>
  </>
}
