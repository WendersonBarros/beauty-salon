import { SiGooglemaps, SiInstagram } from "react-icons/si";

function Links() {
  return (
    <section
      className="w-full mb-8"
    >
      <h2 className="font-bold text-2xl text-white text-center my-4">
        Links:
      </h2>

      <div className="flex justify-center gap-10">
        <a
          target="_blank"
          href="https://www.instagram.com/suzanebarros5/"
        >
          <SiInstagram className="text-4xl text-darkYellow cursor-pointer" />
        </a>
        <a
          target="_blank"
          href="https://maps.app.goo.gl/b8aZJ2EvBZckwgVv9"
        >
          <SiGooglemaps className="text-4xl text-darkYellow cursor-pointer" />
        </a>
      </div>
    </section>
  )
}

export default Links;
