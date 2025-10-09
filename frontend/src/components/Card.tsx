type CardProps = {
  image: string,
  styles: string
}

function Card({ image, styles }: CardProps) {
  return (
    <div className={styles}>
      <img
        className="w-full h-full object-cover rounded-[50%] border-3"
        src={image}
        alt="Unha de cliente"
      />
    </div>
  )
}

export default Card;
