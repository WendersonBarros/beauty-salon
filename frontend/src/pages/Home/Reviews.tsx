import { IoMdStar } from "react-icons/io";
import { LuQuote } from "react-icons/lu";

function Reviews() {
  const reviews = [
    {
      name: "Danielle Costa",
      text: "Cliente há mais de 20 anos. Excelente profissional!",
      stars: 5
    },
    {
      name: "Leonice Cruz",
      text: "Excelente manicure, não troco por nada. Cliente há mais de 20 anos.",
      stars: 5
    },
    {
      name: "Cida Morbeck",
      text: "Super indico! Minha manicure há vários anos. Maravilhosa!",
      stars: 5
    },
    {
      name: "Sonia Regina",
      text: "Foi muito bom, pois a Suzane é uma ótima manicure!",
      stars: 5
    },
    {
      name: "Gabrielly Fernandes",
      text: "Ótima profissional!",
      stars: 5
    }
  ];


  return (
    <section
      className="flex flex-col items-center w-[95%]"
    >
      <h2 className="font-bold text-2xl text-white my-4">Reviews:</h2>

      {reviews.map((review, idx) => {
        const isEven = idx % 2 == 0;
        return <div
          key={idx}
          className={`flex flex-col w-full p-7
          ${(reviews.length - 1) == idx ? "" : "mb-[5vw]"}
          rounded-2xl gap-4 ${isEven
              ? "border-1 border-gray-500"
              : "bg-darkYellow text-black rotate-345"}
          `}
        >
          <div className="flex">
            {
              Array.from({ length: review.stars }).map((_, idx) => {
                return <IoMdStar
                  key={idx}
                  className={`${isEven ? "text-darkYellow" : "text-black"} size-6`}
                />
              })
            }
          </div>
          <p>{review.text}</p>
          <div className="font-bold flex justify-between items-center">
            <span>{review.name}</span>
            <LuQuote
              className={`size-8 ${isEven ? "text-darkYellow" : "text-black"}`}
            />
          </div>
        </div>
      })}
    </section>
  )
}

export default Reviews;
