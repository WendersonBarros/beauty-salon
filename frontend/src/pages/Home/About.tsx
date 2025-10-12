function About() {
  return (
    <section
      className="flex flex-col items-center justify-center w-full gap-3 
      bg-darkYellow p-3 rounded-xl [grid-area:bb]"
    >
      <h2 className="font-bold text-3xl lg:text-5xl text-black">Sobre o salão:</h2>

      <p className="text-[1.1rem] lg:text-xl text-black">
        O espaço foi pensado para oferecer conforto e privacidade em cada atendimento.
        Embora seja um ambiente simples, é totalmente equipado com as ferramentas e produtos
        necessários para proporcionar um resultado de qualidade, com todo o cuidado e atenção a cada detalhe.
      </p>

      <p className="text-[1.1rem] lg:text-xl text-black">
        O atendimento é feito de forma individual e personalizada, em um ambiente tranquilo e reservado,
        ideal para quem busca um momento de relaxamento e autocuidado. Cada pessoa é recebida com dedicação,
        para que a experiência seja leve, agradável e realmente especial.
      </p>
    </section>
  )
}

export default About;
