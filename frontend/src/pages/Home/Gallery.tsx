import nail1 from "../../assets/nail1.jpg";
import nail2 from "../../assets/nail2.jpg";
import nail3 from "../../assets/nail3.jpg";
import nail4 from "../../assets/nail4.jpg";
import nail5 from "../../assets/nail5.jpg";
import nail6 from "../../assets/nail6.jpg";
import Card from "../../components/Card";

function Gallery() {
  const images = [nail1, nail2, nail3, nail4, nail5, nail6];

  return (
    <section className="w-full my-4">
      <div className="flex justify-between flex-wrap gap-y-4 gap-x-2">
        {images.map((image, idx) => {
          return <Card key={idx} image={image} styles="w-60 h-60 mx-auto" />
        })}
      </div>
    </section>
  )
}

export default Gallery;


