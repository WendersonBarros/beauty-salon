import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/small-logo.jpg";

function Header() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <header
      className="flex justify-between items-center py-5 z-1
    px-3 text-white sticky top-0 bg-black"
    >
      <div
        className="flex items-center gap-1 w-[50%] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="w-5 md:w-7" />
        <h1
          className="text-[1.1rem] md:text-[1.3rem] font-semibold"
        >
          Suzane Barros
        </h1>
      </div>
      <div
        className="flex items-center justify-end gap-6 w-[50%]"
      >
        <Link
          to="/"
          className={`${pathname === "/"
            ? "text-darkYellow font-bold"
            : "text-white font-semibold"
            }
          hover:text-darkYellow md:text-xl
          text-sm text-center cursor-pointer`}
        >
          Sobre
        </Link>
        <Link
          to="/prices"
          className={`${pathname === "/prices"
            ? "text-darkYellow font-bold"
            : "text-white font-semibold"
            }
          hover:text-darkYellow md:text-xl
          text-sm text-center cursor-pointer`}
        >
          Preços
        </Link>
      </div>
    </header>
  );
}

export default Header;
