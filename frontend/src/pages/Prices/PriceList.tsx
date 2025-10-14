import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

function PriceList() {
  const [filter, setFilter] = useState("");

  const services = [
    {
      id: 1,
      name: "Manicure",
      products: [
        { id: 1, name: "Manicure simples", price: 35 },
        { id: 2, name: "Esmaltação em gel", price: 55 },
        { id: 3, name: "Alongamento de unhas", price: 120 },
        { id: 4, name: "Manutenção de alongamento", price: 80 },
        { id: 5, name: "Nail art personalizada", price: 25 },
      ],
    },
    {
      id: 2,
      name: "Pedicure",
      products: [
        { id: 6, name: "Pedicure simples", price: 40 },
        { id: 7, name: "Pedicure completa", price: 60 },
        { id: 8, name: "Spa dos pés", price: 90 },
        { id: 9, name: "Hidratação profunda", price: 45 },
        { id: 10, name: "Esmaltação em gel", price: 50 },
      ],
    },
    {
      id: 3,
      name: "Sobrancelha",
      products: [
        { id: 11, name: "Design de sobrancelha", price: 35 },
        { id: 12, name: "Design com pinça", price: 30 },
        { id: 13, name: "Design com rena", price: 55 },
        { id: 14, name: "Henna para sobrancelhas", price: 50 },
        { id: 15, name: "Brow lamination (lifting)", price: 85 },
      ],
    },
    {
      id: 4,
      name: "Spa",
      products: [
        { id: 16, name: "Massagem relaxante", price: 120 },
        { id: 17, name: "Limpeza de pele", price: 110 },
        { id: 18, name: "Esfoliação corporal", price: 90 },
        { id: 19, name: "Hidratação corporal", price: 100 },
        { id: 20, name: "Banho de lua", price: 80 },
      ],
    },
    {
      id: 5,
      name: "Depilação",
      products: [
        { id: 21, name: "Depilação de buço", price: 25 },
        { id: 22, name: "Depilação de axila", price: 35 },
        { id: 23, name: "Depilação de meia perna", price: 55 },
        { id: 24, name: "Depilação de perna completa", price: 80 },
        { id: 25, name: "Depilação íntima", price: 90 },
      ],
    },
  ];

  const filteredServices = services
    .map(category => {
      const matchesCategory = category.name.toLowerCase().includes(
        filter.toLowerCase()
      );

      const filteredProducts = category.products.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      );

      return matchesCategory
        ? { ...category, products: category.products }
        : { ...category, products: filteredProducts }
    })
    .filter(category => category.products.length > 0);


  return (
    <section className="grid gap-2 min-h-screen justify-items-center w-full">
      <search className="flex flex-col w-full gap-5">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Pesquisar serviço
        </label>
        <div className="relative">
          <div
            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <IoMdSearch className="text-xl text-darkYellow" />
          </div>
          <input
            type="search"
            id="search"
            value={filter}
            onChange={event => setFilter(event.target.value)}
            placeholder="Digite o nome do serviço (unha em gel, pedicure, sobrancelha...)"
            className="w-full p-4 ps-10 text-sm text-black border-2 rounded-lg bg-gray-50
          focus:outline-none focus:border-darkYellow"
          />
        </div>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {filteredServices.map(category => {
            return <div key={category.id}>
              <h3
                className="text-white font-semibold text-3xl p-2
                w-full text-center"
              >
                {category.name}
              </h3>

              <ul className="flex flex-col gap-2 group">
                {category.products.map((product, idx) => {
                  return <li
                    key={product.id}
                    className={`flex justify-between items-center text-xl
                    group-hover:blur-sm hover:!blur-none p-4 rounded-lg gap-2
                    ${idx % 2 == 0 ? "bg-white" : "bg-darkYellow"}`}
                  >
                    <span className="">{product.name}</span>
                    <span
                      className={`whitespace-nowrap font-bold
                      ${idx % 2 == 0 ? "text-darkYellow" : "text-white"}`}
                    >
                      R$ {product.price}
                    </span>
                  </li>
                })}
              </ul>
            </div>
          })}
        </section>
      </search>
    </section>
  )
}

export default PriceList;
