import { request } from "http";
import { AppDataSource } from "./data-source"
import Fastify from "fastify"

AppDataSource.initialize().then(async () => {
  console.log("Here you can setup and run express / fastify / any other framework.")

  const fastify = Fastify({
    logger: true
  });

  fastify.get('/', (request, reply) => {
    reply.send({ hello: "world" });
  });

  fastify.listen({port: 3000}, (err, address) => {
    if(err) {
      fastify.log.error(err);
      process.exit(1);
    }

    console.log(`Server is listening on ${address}`);
  });
}).catch(error => console.log(error))
