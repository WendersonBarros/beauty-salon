import PriceList from "./PriceList";

function Prices() {
  return (
    <main className="grid px-2 gap-2">
      <div className="bg-darkYellow rounded-xl w-full" >
        <h2 className="font-bold text-3xl lg:text-5xl px-8 py-28">
          Serviços e Preços
        </h2>
      </div>
      <PriceList />
    </main>
  )
}

export default Prices;
