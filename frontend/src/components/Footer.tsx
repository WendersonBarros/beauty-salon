function Footer() {
  return (
    <footer
      className="w-full flex flex-col gap-6 bg-darkYellow p-5 pb-0"
    >
      <div className="flex justify-between gap-10 items-center">
        <h2 className="font-semibold text-xl my-4">Contato</h2>
        <div className="flex flex-col gap-2">
          <p>Rua 129, Casa 02 Quadra 135, Cuiabá - MT, 78058-314</p>
          <p>(65) 99313-1000</p>
        </div>
      </div>

      <div className="border-black border-t-1 text-center py-4 font-semibold">
        Feito por <a
          target="_blank"
          href="http://github.com/WendersonBarros"
          className="underline hover:text-white"
        >
          Wenderson Barros
        </a>
      </div>
    </footer>
  )
}

export default Footer;
