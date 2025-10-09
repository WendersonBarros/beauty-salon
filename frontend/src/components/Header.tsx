import logo from "../assets/small-logo.jpg";

function Header() {
  return (
    <header className="flex justify-between items-center p-5 min-h-[10%] text-white">
      <div className="flex items-center gap-1 w-[50%] cursor-pointer">
        <img src={logo} className="w-[2rem]" />
        <h1 className="text-[1.2rem] font-semibold">Suzane Barros</h1>
      </div>
      <div>
        <button
          type="button"
          className="text-black bg-gradient-to-r from-yellow-500
          to-darkYellow hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
          focus:ring-white font-semibold rounded-lg text-sm px-5 py-2.5
          text-center cursor-pointer"
        >
          Preços
        </button>
      </div>
    </header>
  );
}

export default Header;
