function About() {
  return (
    <section
      className="flex flex-col items-center w-full max-w-5xl gap-3 mb-5 bg-darkYellow p-3 rounded-xl"
    >
      <h2 className="font-bold text-2xl text-white">Sobre o salão:</h2>

      <p className="text-xl text-black">
        O espaço foi pensado para oferecer conforto e privacidade em cada atendimento.
        Embora seja um ambiente simples, é totalmente equipado com as ferramentas e produtos
        necessários para proporcionar um resultado de qualidade, com todo o cuidado e atenção a cada detalhe.
      </p>

      <p className="text-xl text-black">
        O atendimento é feito de forma individual e personalizada, em um ambiente tranquilo e reservado,
        ideal para quem busca um momento de relaxamento e autocuidado. Cada pessoa é recebida com dedicação,
        para que a experiência seja leve, agradável e realmente especial.
      </p>
    </section>
  )
}

export default About;
