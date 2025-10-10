import salonPhoto from "../../assets/salon.jpg";
import About from "./About";
import Gallery from "./Gallery.tsx";
import Reviews from "./Reviews.tsx";
import Links from "./Links.tsx";

function Home() {
  return (
    <main
      className="flex flex-col  items-center bg-black min-h-[80%] w-full
      text-white px-2 gap-4 overflow-x-hidden"
    >
      <figure className="w-full flex justify-center max-w-4xl m-auto">
        <img
          src={salonPhoto}
          alt="Foto do espaço do salão de beleza"
          className="rounded-xl w-full object-cover border-3"
        />
      </figure>
      <About />
      <Gallery />
      <Reviews />
      <Links/>
    </main>
  )
}

export default Home;
