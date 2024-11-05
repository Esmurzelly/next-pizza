import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold" />
    </Container>

    <TopBar />

    <Container className="pb-14 mt-10">
      <div className="flex gap-[60px]">
        {/* Filter */}
        <div className="w-[250px]">
          <Filters />
        </div>

        {/* Goods list */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList
              title="Пиццы"
              categoryId={1}
              items={[
                {
                  id: 1,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 2,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 3,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 4,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 5,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 6,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 7,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 8,
                  name: "CheeseBurger Pizza",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
              ]}
            />

            <ProductsGroupList
              title="Комбо"
              categoryId={2}
              items={[
                {
                  id: 1,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 2,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 3,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 4,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 5,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 6,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 7,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
                {
                  id: 8,
                  name: "Fruchstuck",
                  imageUrl: "https://media.dodostatic.net/image/r:584x584/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                  price: 550,
                  items: [{ price: 550 }]
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Container>
  </>
}
