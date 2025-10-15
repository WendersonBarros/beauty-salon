import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useGetCategories } from "../../hooks/categories";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function PriceList() {
  const [filter, setFilter] = useState("");
  const { isPending, isError, error, data } = useGetCategories();

  if (isPending) {
    return <section className="min-h-screen w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {Array.from({ length: 9 }).map((_, idx) =>
          <div key={idx} className="flex flex-col gap-2">
            <Skeleton
              baseColor="#f7971f"
              height={"3.5rem"}
              width="100%"
              style={{ opacity: 0.7 }}
            />
            <Skeleton
              baseColor="#ffffff"
              height={"2.5rem"}
              width="100%"
              style={{ opacity: 0.5 }}
            />
            <Skeleton
              baseColor="#f7971f"
              height={"2.5rem"}
              width="100%"
              style={{ opacity: 0.5 }}
            />
            <Skeleton
              baseColor="#ffffff"
              height={"2.5rem"}
              width="100%"
              style={{ opacity: 0.5 }}
            />
            <Skeleton
              baseColor="#f7971f"
              height={"2.5rem"}
              width="100%"
              style={{ opacity: 0.5 }}
            />
          </div>
        )}
      </div>
    </section>
  }

  if (isError) {
    return <section
      className="text-white min-h-screen flex flex-col items-center mt-4"
    >
      <h2 className="text-2xl">Ocorreu um erro inesperado: </h2>
      <b className="text-xl text-red-600">{error.message}</b>
    </section>
  }

  const filteredServices = data
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
          className="mb-2 text-sm font-medium text-gray-900 sr-only 
          dark:text-white"
        >
          Pesquisar serviço
        </label>
        <div className="relative">
          <div
            className="absolute inset-y-0 start-0 flex items-center ps-3
            pointer-events-none"
          >
            <IoMdSearch className="text-xl text-darkYellow" />
          </div>
          <input
            type="search"
            id="search"
            value={filter}
            onChange={event => setFilter(event.target.value)}
            placeholder="Digite o nome do serviço (unha em gel, pedicure, sobrancelha...)"
            className="w-full p-4 ps-10 text-sm text-black border-2
            rounded-lg bg-gray-50 focus:outline-none focus:border-darkYellow"
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
